-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again; cannot drop currently open db
-- DROP DATABASE IF EXISTS postgres;

-- Create the db; db already created in pgAdmin 4
-- CREATE DATABASE postgres;

-- Move into the db
\c postgres

-- Create our table if it doesn't already exist
-- CREATE TABLE IF NOT EXISTS provider_user_table

DROP TABLE provider_participant_intake;

CREATE TABLE provider_participant_intake(participant_id INTEGER,provider VARCHAR,address_line1 VARCHAR,address_line2 VARCHAR,address_city VARCHAR,address_state VARCHAR,address_zipcode VARCHAR,gender VARCHAR,sexual_orientation VARCHAR,ethnicity VARCHAR,children VARCHAR,foster_care VARCHAR,incarceration VARCHAR,immigration VARCHAR,accommodations VARCHAR[],intake_form_completed DATE,first_name VARCHAR,last_name VARCHAR,preferred_name VARCHAR,survivorship VARCHAR[],county_services VARCHAR,county_location VARCHAR,phone VARCHAR,email VARCHAR,participant_status VARCHAR,preferred_language VARCHAR[],date_of_birth DATE,unhoused BOOLEAN, general_form_completed DATE,first_name_general VARCHAR,last_name_general VARCHAR,preferred_name_general VARCHAR,phone_general VARCHAR,email_general VARCHAR,num_of_children INTEGER);

-- Changes the owner of the table to postgres which is the default when installing postgres; owner is already postgres
-- CREATE TABLE provider_user_table 
-- OWNER TO postgres;