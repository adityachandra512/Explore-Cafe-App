// Restaurant.js

import { useState } from 'react';

// Function to fetch nearby restaurants
// Function to fetch nearby restaurants
export const fetchNearbyRestaurants = () => {
    return [
      {
        id: 1,
        name: 'All American Burgers',
        address: '123 Burger Lane, Food City',
        rating: 4.5,
        reviewsCount: 120,
        status: 'Open',
        image: 'https://th.bing.com/th/id/OIP.nRxwlKNDfVT1fg0cSv_6-wHaFj?rs=1&pid=ImgDetMain',
      },
      {
        id: 2,
        name: 'Pizza Planet',
        address: '456 Pizza Avenue, Cheese Town',
        rating: 4.7,
        reviewsCount: 200,
        status: 'Closed',
        image: 'https://th.bing.com/th/id/R.44ae381d53b3f7f5c337b0a7db61094f?rik=0w%2bRYGDm4xe71Q&riu=http%3a%2f%2fwww.disneyfoodblog.com%2fwp-content%2fuploads%2f2012%2f07%2fPizza-planet-outside-2.jpg&ehk=X%2fAU3oIvGEJr7fwtf%2bUYA1aMvRcFyCY%2bX7POoOrJOoQ%3d&risl=&pid=ImgRaw&r=0',
      },
      {
        id: 3,
        name: 'Sushi Heaven',
        address: '789 Sushi Street, Fish City',
        rating: 4.8,
        reviewsCount: 150,
        status: 'Open',
        image: 'https://th.bing.com/th/id/OIP.JUj3vjQADKulOnSiLZrhPgHaFj?rs=1&pid=ImgDetMain',
      },
    ];
  };
  