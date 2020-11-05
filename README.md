# UsersOnMap

## Zadanie

Utworzyć aplikację webową w wybranej technologii umożliwiającą rejestrowanie i przeglądanie zarejestrowanych użytkowników. 

Wymagania

Formularz rejestracyjny powinien wymagać wprowadzenia następujących informacji:
-Imię
-Nazwisko
-Adres email
-Informacje adresowe z wykorzystaniem API (formularz w postaci hierarchicznej: województwo, powiat, gmina, itd...)

Linki do API:

https://capap.gugik.gov.pl/api/fts/hier/_cfg

https://capap.gugik.gov.pl/api/fts/#_query2usingpost

Podgląd listy zarejestrowanych użytkowników powinien składać się z:
	
- listy wszystkich użytkowników
- mapy prezentującej ich lokalizacje (punkty – wykorzystując geometrię adresu z formularza rejestracyjnego)


## Dependencies

npm install -g @angular/cli (version 10.2.0.)

ng add @angular/material

npm install ol

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

If you want to build for Tomcat server use `ng build --base-href`
## To run from /dist folder

npm install angular-http-server -g

angular-http-server --path ./dist/users-on-map

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
