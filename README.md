# New Password and Image Pattern User Authentication Schema

<img width="1582" alt="image" src="https://user-images.githubusercontent.com/63140632/231839763-5587638d-b5dd-4887-96dc-ce05f65ad666.png">

The proposed authentication system combines traditional password-based authentication with an image pattern-based authentication to enhance security. Users must set a password and create a unique image pattern as their login credentials, divided into 16 grids. The image is not stored on the backend server and is deleted immediately after the authentication process is complete.

## 👨‍💻 Tech Stack
- [NextJs](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
```sh
npm install npm@latest -g
```

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/nimishjn/hash-generator.git
```
2. Change directory to riddler-frontend-2021
```sh
cd hash-generator
```
3. Install NPM packages
```sh
npm install
```

### Run and build
* Run in development server
```sh
npm run dev
```
* Build project
```sh
npm run build
```
* Run in production server (after completing build)
```sh
npm run start
```

## 🎓 College project documentation
https://docs.google.com/document/d/1KZGvFCrIQHq-Nlt-rPawrSzBEKFovA-KmBVIKbbCJLc

## 👾 Hashing Algorithm 

### Inputs:
* Text password
* Chosen image data
* Index of grids chosen

### Steps:
1. The chosen image is compressed into a 100 px by 100 px size.
2. The base 64 data of the compressed image is extracted. Eg: data:image/png;base64,iVBORw0KGgoAAAANSU……
3. The base 64 text is hashed using SHA512 and stored as "image_hash."
4. The “image_hash” is split into 16 equal elements.
5. The elements corresponding to the index of grids chosen are concatenated.
6. The above concatenated text is merged with the text password and hashed using SHA512.
7. Output the final hash from step 6.

### Output:
* Final hash

## 💻 Contributors
<a href="https://github.com/nimishjn/hash-generator/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nimishjn/hash-generator" />
</a>
