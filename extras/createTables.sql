-- I create these tables in a postgres database called budget_friendly

CREATE DATABASE budget_friendly;

CREATE TABLE transaction (
  transaction_id serial PRIMARY KEY,
  user_account_id integer NOT NULL REFERENCES user_account(user_account_id) ON DELETE CASCADE ON UPDATE CASCADE,
  transaction_date date NOT NULL DEFAULT CURRENT_DATE,
  transaction_description text NOT NULL,
  transaction_type text NOT NULL,
  category_id integer DEFAULT 'Uncategorized' REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE CASCADE,
  bank_account_id integer REFERENCES bank_account(bank_account_id) ON DELETE CASCADE ON UPDATE CASCADE,
  transaction_amount decimal NOT NULL
);



CREATE TABLE monthly_budget (
  monthly_budget_id serial PRIMARY KEY,
  monthly_budget_amount decimal NOT NULL,
  monthly_budget_month integer NOT NULL,
  monthly_budget_year integer NOT NULL,
);

CREATE TABLE budget_by_category (
  category_id integer REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE CASCADE,
  monthly_budget_id integer REFERENCES monthly_budget(monthly_budget_id) ON DELETE CASCADE ON UPDATE CASCADE,
  budget_by_category_amount decimal NOT NULL,
  PRIMARY KEY (category_id, monthly_budget_id)
);

CREATE TABLE user_account (
  user_account_id serial PRIMARY KEY,
  user_account_name varchar(70) NOT NULL,
  user_account_email varchar(254) NOT NULL,
  user_account_password varchar(70) NOT NULL,
  UNIQUE (user_account_email)
);

CREATE TABLE bank_account (
  bank_account_id serial PRIMARY KEY,
  bank_account_number integer NOT NULL
  bank_account_name text NOT NULL,
  bank_account_balance decimal
);

CREATE TABLE category (
  category_id serial PRIMARY KEY,
  category_name text NOT NULL
);
  
CREATE TABLE refresh_token (
  refresh_token_id serial PRIMARY KEY,
  user_account_id integer NOT NULL REFERENCES user_account(user_account_id) ON DELETE CASCADE ON UPDATE CASCADE,
  refresh_token text NOT NULL
);

-- This table is being saved for future use
--   Table budget (
--     budget_id serial PRIMARY KEY,
--     budget_name text,
--     budget_total decimal
--   )
--   this table is for a future project budgets
  

