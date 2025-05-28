# FinTrack - Personal Finance Tracker

A mobile application for tracking personal finances, built with React Native and Expo.

## Pages

### Authentication

- `/auth/login` - User login page
- `/auth/signup` - User registration page

### Main Navigation (Tabs)

- `/` - Home page with dashboard and summary
- `/expenses` - Expenses list and management
- `/profile` - User profile management

### Expense Management

- `/expense/[id]` - Individual expense details page

## API Endpoints

### User Management

- `POST /users` - Register a new user

  - Request Body:
    ```typescript
    {
      firstName: string;
      lastName: string;
      username: string;
      password: string;
    }
    ```
  - Response:
    ```typescript
    {
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      createdAt: string;
    }
    ```

- `GET /users` - Get user by username
  - Query Parameters:
    - `username: string`
  - Response: Array of users matching the username

### Authentication

- Login is handled through the `/users` endpoint by filtering username and password
- User data is persisted using AsyncStorage with the key `@user`

## Features

### Authentication

- User registration with first name, last name, username, and password
- User login with username and password
- Persistent login state using AsyncStorage

### Home Page

- Dashboard view with financial summary
- Recent transactions display
- Quick access to main features

### Expenses

- List of all expenses
- Add new expenses
- Filter expenses by category
- View individual expense details
- Edit expense details
- Delete expenses

### Profile

- View user information
- Edit profile details
- Logout functionality

## Technical Stack

- React Native
- Expo
- AsyncStorage for local data persistence
- Axios for API requests

Winona88@gmail.com
K1WhMnOMjFPMk7J

Okay, I can extract the username (email) and password pairs from the JSON data you provided.

Here they are:

Username: Columbus0@hotmail.com
Password: N68NH5rZrnzHMgn

Username: Ahmad.Jerde@yahoo.com
Password: rQ0X9rjLlKaCbJx

Username: Barry.Monahan@gmail.com
Password: dtqdHjOImgGl63f

Username: Vergie67@yahoo.com
Password: NcYi4Zt0iBXHYVq

Username: Vilma.Pfannerstill27@gmail.com
Password: KmdwL85SwttACMm

Username: Ali.Hirthe@hotmail.com
Password: iY_2KCwBK29rZRh

Username: Austen.Bayer@gmail.com
Password: XvAcXYlYDTgjpDf

Username: Idell_Rau@yahoo.com
Password: nX8Roob3UkIGsxu

Username: Carol_Schaden7@gmail.com
Password: h3UedHVY1fwv0ie

Username: Oswaldo50@gmail.com
Password: 7tvT9_v1Tra84yI

Username: Griffin_Daugherty@gmail.com
Password: 5d08l1AWh5Lrw9O

Username: Lori_Quitzon76@gmail.com
Password: uq3o1lAAPl69BXF

Username: Jerome_Roberts85@gmail.com
Password: xeauezK6IdQyDxa

Username: Jerad.Ratke@yahoo.com
Password: aJgOpsH16MDc8F\_

Username: Corrine61@hotmail.com
Password: pX85004OBK5a_Ga

Username: Nick67@yahoo.com
Password: pKecJs7tJSt3LGh

Username: Gina.Nitzsche@yahoo.com
Password: oaFzxhbn2Xpy5wp

Username: Orion86@hotmail.com
Password: 4Do6mhIOnkoDV6s

Username: Reece_Moore@gmail.com
Password: 4QocEkXht1UkrCz

Username: Idell.Schimmel@hotmail.com
Password: GU7ygpQpfR8BnDX

Username: Linnie_Pacocha13@hotmail.com
Password: af05ClO2f7PmW1Y

Username: Narciso_Gutkowski@yahoo.com
Password: A_9rdMMQQPaGvuo

Username: Bailey_Rowe34@gmail.com
Password: ikDMUwTM61AUf7e

Username: Carolanne8@gmail.com
Password: TANeB9LAUmZDEPF

Username: Nicolas_Bergstrom@gmail.com
Password: nUceYp6lBLtmyUz

Username: Hazel89@hotmail.com
Password: 2_m_R7T9Wgznv9Z

Username: Bertha_Klocko60@yahoo.com
Password: NYwnRGHR15Lo4MB

Username: Jennifer1@hotmail.com
Password: YvpcAuKs9axwwW1

Username: Donald20@hotmail.com
Password: cSfmwvcISCmgELV

Username: Angelo.Jenkins86@yahoo.com
Password: f6eM7jc29CnLUYr

Username: Theodora_Heidenreich46@gmail.com
Password: 60Q3LkvhM4KWYmN

Username: Damon74@gmail.com
Password: n2qutdldx7ebIco

Username: Lucienne_Price24@hotmail.com
Password: imnQtlDZ5jbgE1J

Username: Rylee_Abernathy2@gmail.com
Password: mcYROnYbqTUiN_f

Username: Kari_Corwin@hotmail.com
Password: iemAC9NxeEDSeVP

Username: Rhett_Cruickshank@gmail.com
Password: o6ObCewmXdytVyw

Username: Yadira.Graham54@yahoo.com
Password: wUc66NTPcypvpKk

This list should allow you to test the login functionality of your application with your existing MockAPI data.

Okay, here are the username (email) and password pairs from the new JSON data snippet you provided:

Username: Maci94@hotmail.com
Password: R0ChVUODGqjwaAF

Username: Jessy17@hotmail.com
Password: Z8dUJaJvPoy4Ahm

Username: Winona88@gmail.com
Password: K1WhMnOMjFPMk7J

Username: Maverick.Nienow32@hotmail.com
Password: xvOfsq26TCP9C1Y

Username: Columbus0@hotmail.com
Password: N68NH5rZrnzHMgn

This should help you continue testing with these specific user credentials.
