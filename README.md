<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/annasudol/chain-explorer-avail">
    <img src="public/avail-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Avail Chain Explorer</h3>

  <p align="center">
    A modern blockchain explorer for the Avail network
    <br />
    <a href="https://github.com/annasudol/chain-explorer-avail">View Demo</a>
  </p>
</div>

  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Avail Chain Explorer Screen Shot][product-screenshot]](https://chain-explorer-avail.netlify.app/)

Avail Chain Explorer is a modern, user-friendly blockchain explorer specifically designed for the Avail network. It allows users to easily explore blocks, transactions, and network statistics on the Avail blockchain.

Key features:
* Browse and search through the latest blocks and transactions
* View detailed information about blocks, including block hash, number, and timestamp
* Examine transaction details and extrinsics
* Track network statistics in real-time
* Connect your wallet to interact with the Avail network

### Built With

This project leverages cutting-edge web technologies to provide a smooth and responsive user experience:

* [![Next.js][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Tailwind CSS][TailwindCSS]][TailwindCSS-url]
* [![Zustand][Zustand]][Zustand-url]
* [![RadixUI][RadixUI]][RadixUI-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

This project uses npm as its package manager. Make sure you have the latest version installed.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/annasudol/chain-explorer-avail.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file based on the `.env.example` template
   ```sh
   cp .env.example .env
   ```
4. Set the appropriate Avail indexer URL in the `.env` file
   ```
   NEXT_PUBLIC_INDEXER_URL="https://turing-indexer.avail.so"
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the explorer in action.

You can start exploring:
- The latest blocks on the Avail network
- Transaction details and history
- Network statistics
- Connect your wallet to interact with the blockchain

<p align="right">(<a href="#readme-top">back to top</a>)</p>


See the [open issues](https://github.com/annasudol/chain-explorer-avail/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
