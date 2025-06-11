create table public.tours (
  id bigint not null,
  title text not null,
  hero_image text not null,
  location text not null,
  destination text not null,
  base_price bigint not null,
  old_price bigint null,
  duration text not null,
  rating double precision not null,
  slug text not null,
  is_featured boolean not null default false,
  created_at timestamp with time zone not null default now(),
  description text null,
  highlights json null,
  review_count integer null default 0,
  sort_order integer null default 0,
  updated_at timestamp without time zone null default now(),
  constraint tours_pkey primary key (id)
) TABLESPACE pg_default;

create index IF not exists idx_tours_destination on public.tours using btree (destination) TABLESPACE pg_default;

create index IF not exists idx_tours_featured on public.tours using btree (is_featured) TABLESPACE pg_default;

create index IF not exists idx_tours_slug on public.tours using btree (slug) TABLESPACE pg_default;

create table public.tour_translations (
  id serial not null,
  tour_id integer null,
  language character varying(5) null default 'th'::character varying,
  field character varying(50) not null,
  content text not null,
  created_at timestamp without time zone null default now(),
  constraint tour_translations_pkey primary key (id),
  constraint tour_translations_tour_id_fkey foreign KEY (tour_id) references tours (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_tour_translations_tour_id on public.tour_translations using btree (tour_id) TABLESPACE pg_default;

create index IF not exists idx_tour_translations_language on public.tour_translations using btree (language) TABLESPACE pg_default;

create table public.tour_reviews (
  id serial not null,
  tour_id integer null,
  name character varying(100) not null,
  rating numeric(2, 1) not null,
  comment text not null,
  avatar character varying(255) null,
  review_date date not null,
  created_at timestamp without time zone null default now(),
  constraint tour_reviews_pkey primary key (id),
  constraint tour_reviews_tour_id_fkey foreign KEY (tour_id) references tours (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_tour_reviews_tour_id on public.tour_reviews using btree (tour_id) TABLESPACE pg_default;

create table public.tour_options (
  id serial not null,
  tour_id integer null,
  name character varying(100) not null,
  price_modifier integer null default 0,
  description text null,
  sort_order integer null default 0,
  created_at timestamp without time zone null default now(),
  constraint tour_options_pkey primary key (id),
  constraint tour_options_tour_id_fkey foreign KEY (tour_id) references tours (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_tour_options_tour_id on public.tour_options using btree (tour_id) TABLESPACE pg_default;

create table public.tour_media (
  id serial not null,
  tour_id integer null,
  type character varying(20) null default 'image'::character varying,
  url character varying(255) not null,
  alt_text character varying(255) null,
  caption text null,
  sort_order integer null default 0,
  created_at timestamp without time zone null default now(),
  constraint tour_media_pkey primary key (id),
  constraint tour_media_tour_id_fkey foreign KEY (tour_id) references tours (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.tour_itineraries (
  id serial not null,
  tour_id integer null,
  option_id integer null,
  time_slot character varying(50) null,
  activity character varying(255) not null,
  description text null,
  sort_order integer null default 0,
  created_at timestamp without time zone null default now(),
  constraint tour_itineraries_pkey primary key (id),
  constraint tour_itineraries_option_id_fkey foreign KEY (option_id) references tour_options (id) on delete CASCADE,
  constraint tour_itineraries_tour_id_fkey foreign KEY (tour_id) references tours (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_tour_itineraries_tour_id on public.tour_itineraries using btree (tour_id) TABLESPACE pg_default;

create table public.tour_content (
  id serial not null,
  tour_id integer null,
  type character varying(50) not null,
  content text not null,
  sort_order integer null default 0,
  created_at timestamp without time zone null default now(),
  constraint tour_content_pkey primary key (id),
  constraint tour_content_tour_id_fkey foreign KEY (tour_id) references tours (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_tour_content_tour_id on public.tour_content using btree (tour_id) TABLESPACE pg_default;

create index IF not exists idx_tour_content_type on public.tour_content using btree (type) TABLESPACE pg_default;

create table public.group_tour_inquiries (
  id serial not null,
  customer_name character varying(255) not null,
  customer_email character varying(255) not null,
  customer_phone character varying(20) not null,
  group_type character varying(100) not null,
  group_size integer not null,
  travel_date date null,
  destination character varying(255) null,
  budget character varying(100) null,
  special_requirements text null,
  status character varying(20) null default 'pending'::character varying,
  is_read boolean null default false,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint group_tour_inquiries_pkey primary key (id)
) TABLESPACE pg_default;

create index IF not exists idx_group_tour_inquiries_status on public.group_tour_inquiries using btree (status) TABLESPACE pg_default;

create index IF not exists idx_group_tour_inquiries_created on public.group_tour_inquiries using btree (created_at) TABLESPACE pg_default;

create table public.group_tour_gallery (
  id serial not null,
  title character varying(255) not null,
  image_url text not null,
  type character varying(20) not null,
  participants_count integer null,
  year integer null,
  sort_order integer null default 0,
  is_active boolean null default true,
  created_at timestamp with time zone null default now(),
  constraint group_tour_gallery_pkey primary key (id),
  constraint group_tour_gallery_type_check check (
    (
      (type)::text = any (
        (
          array[
            'domestic'::character varying,
            'international'::character varying
          ]
        )::text[]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_group_tour_gallery_type on public.group_tour_gallery using btree (type) TABLESPACE pg_default;

create index IF not exists idx_group_tour_gallery_active on public.group_tour_gallery using btree (is_active) TABLESPACE pg_default;