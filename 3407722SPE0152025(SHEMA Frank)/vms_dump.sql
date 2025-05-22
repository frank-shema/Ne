--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public."enum_Users_role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CarEntries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CarEntries" (
    id bigint NOT NULL,
    plate_number character varying(255) NOT NULL,
    parking_code character varying(255) NOT NULL,
    entry_time timestamp with time zone NOT NULL,
    exit_time timestamp with time zone,
    amount numeric(10,2) DEFAULT 0 NOT NULL,
    ticket_number character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."CarEntries" OWNER TO postgres;

--
-- Name: CarEntries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CarEntries_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CarEntries_id_seq" OWNER TO postgres;

--
-- Name: CarEntries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CarEntries_id_seq" OWNED BY public."CarEntries".id;


--
-- Name: Otps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Otps" (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    code character varying(255) NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Otps" OWNER TO postgres;

--
-- Name: Otps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Otps_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Otps_id_seq" OWNER TO postgres;

--
-- Name: Otps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Otps_id_seq" OWNED BY public."Otps".id;


--
-- Name: ParkingSlots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ParkingSlots" (
    id integer NOT NULL,
    code character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    available_spaces integer NOT NULL,
    location character varying(255) NOT NULL,
    fee_per_hour numeric(10,2) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ParkingSlots" OWNER TO postgres;

--
-- Name: ParkingSlots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ParkingSlots_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ParkingSlots_id_seq" OWNER TO postgres;

--
-- Name: ParkingSlots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ParkingSlots_id_seq" OWNED BY public."ParkingSlots".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id bigint NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public."enum_Users_role" DEFAULT 'user'::public."enum_Users_role" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Vehicles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vehicles" (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    plate_number character varying(255) NOT NULL,
    brand character varying(255) NOT NULL,
    model character varying(255) NOT NULL,
    color character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Vehicles" OWNER TO postgres;

--
-- Name: Vehicles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Vehicles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Vehicles_id_seq" OWNER TO postgres;

--
-- Name: Vehicles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Vehicles_id_seq" OWNED BY public."Vehicles".id;


--
-- Name: CarEntries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarEntries" ALTER COLUMN id SET DEFAULT nextval('public."CarEntries_id_seq"'::regclass);


--
-- Name: Otps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Otps" ALTER COLUMN id SET DEFAULT nextval('public."Otps_id_seq"'::regclass);


--
-- Name: ParkingSlots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParkingSlots" ALTER COLUMN id SET DEFAULT nextval('public."ParkingSlots_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: Vehicles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicles" ALTER COLUMN id SET DEFAULT nextval('public."Vehicles_id_seq"'::regclass);


--
-- Data for Name: CarEntries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CarEntries" (id, plate_number, parking_code, entry_time, exit_time, amount, ticket_number, "createdAt", "updatedAt") FROM stdin;
2	ABC123	A1	2024-03-15 09:00:00+02	2024-03-15 11:00:00+02	10.00	TICKET001	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
3	XYZ789	B1	2024-03-15 10:00:00+02	\N	0.00	TICKET002	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
4	DEF456	C1	2024-03-15 08:00:00+02	2024-03-15 12:00:00+02	40.00	TICKET003	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
5	GHI789	D1	2024-03-15 20:00:00+02	\N	0.00	TICKET004	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
\.


--
-- Data for Name: Otps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Otps" (id, "userId", code, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ParkingSlots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ParkingSlots" (id, code, name, available_spaces, location, fee_per_hour, "createdAt", "updatedAt") FROM stdin;
3	A1	Main Parking	50	Main Street	5.00	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
4	B1	Underground Parking	30	Downtown	7.50	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
5	C1	VIP Parking	20	Business District	10.00	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
6	D1	Night Parking	40	City Center	4.00	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, "firstName", "lastName", email, password, role, "createdAt", "updatedAt") FROM stdin;
1	Admin	User	shemafranko0987@gmail.com	$2b$10$SEcW1fPNy3rR3iPaFUJqZ.DCE.TX.nZlrxPGCwrkHT.ogoAknk0hC	admin	2025-05-22 18:03:48.991+02	2025-05-22 18:03:48.991+02
2	Admin	User	admin@example.com	$2a$10$sT.AEG2mLZCH4OxJmU9kHuVWzZ23hGJ0uL8tAoJjccvC7aycZEUZW	admin	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
3	John	Doe	john@example.com	$2a$10$sT.AEG2mLZCH4OxJmU9kHuVWzZ23hGJ0uL8tAoJjccvC7aycZEUZW	user	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
4	Jane	Smith	jane@example.com	$2a$10$sT.AEG2mLZCH4OxJmU9kHuVWzZ23hGJ0uL8tAoJjccvC7aycZEUZW	user	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
\.


--
-- Data for Name: Vehicles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Vehicles" (id, "userId", plate_number, brand, model, color, "createdAt", "updatedAt") FROM stdin;
1	2	ABC123	Toyota	Camry	Black	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
2	2	XYZ789	Honda	Civic	White	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
3	3	DEF456	Ford	Focus	Blue	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
4	3	GHI789	BMW	X5	Silver	2025-05-20 12:00:00+02	2025-05-20 12:00:00+02
\.


--
-- Name: CarEntries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CarEntries_id_seq"', 5, true);


--
-- Name: Otps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Otps_id_seq"', 1, false);


--
-- Name: ParkingSlots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ParkingSlots_id_seq"', 6, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 4, true);


--
-- Name: Vehicles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Vehicles_id_seq"', 4, true);


--
-- Name: CarEntries CarEntries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarEntries"
    ADD CONSTRAINT "CarEntries_pkey" PRIMARY KEY (id);


--
-- Name: CarEntries CarEntries_ticket_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarEntries"
    ADD CONSTRAINT "CarEntries_ticket_number_key" UNIQUE (ticket_number);


--
-- Name: Otps Otps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Otps"
    ADD CONSTRAINT "Otps_pkey" PRIMARY KEY (id);


--
-- Name: ParkingSlots ParkingSlots_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParkingSlots"
    ADD CONSTRAINT "ParkingSlots_code_key" UNIQUE (code);


--
-- Name: ParkingSlots ParkingSlots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParkingSlots"
    ADD CONSTRAINT "ParkingSlots_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Vehicles Vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicles"
    ADD CONSTRAINT "Vehicles_pkey" PRIMARY KEY (id);


--
-- Name: Vehicles Vehicles_plate_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicles"
    ADD CONSTRAINT "Vehicles_plate_number_key" UNIQUE (plate_number);


--
-- Name: user_plate_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_plate_unique ON public."Vehicles" USING btree ("userId", plate_number);


--
-- Name: CarEntries CarEntries_parking_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarEntries"
    ADD CONSTRAINT "CarEntries_parking_code_fkey" FOREIGN KEY (parking_code) REFERENCES public."ParkingSlots"(code) ON UPDATE CASCADE;


--
-- Name: Otps Otps_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Otps"
    ADD CONSTRAINT "Otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- Name: Vehicles Vehicles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vehicles"
    ADD CONSTRAINT "Vehicles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

