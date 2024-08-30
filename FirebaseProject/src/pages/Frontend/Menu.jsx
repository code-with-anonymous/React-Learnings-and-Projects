import React from 'react';
import "../../Scss/menu.scss";

import image1 from '../../assets/menu-1.jpg';
import image2 from '../../assets/menu-2.jpg';
import image3 from '../../assets/menu-3.jpg';
import image4 from '../../assets/menu-4.jpg';
import image5 from '../../assets/menu-5.jpg';
import image6 from '../../assets/menu-6.jpg';
import image7 from '../../assets/menu-7.jpg';
import image8 from '../../assets/menu-8.jpg';

const menuItems = [
  {
    id: 1,
    title: "Chicken Burger",
    description: "Ipsum ipsum clita erat amet dolor justo diam",
    price: "$115",
    image: image1
  },
  {
    id: 2,
    title: "Veggie Pizza",
    description: "Dolor sit amet, consectetur adipiscing elit",
    price: "$120",
    image: image2
  },
  {
    id: 3,
    title: "Pasta",
    description: "Sed do eiusmod tempor incididunt ut labore",
    price: "$130",
    image: image3
  },
  {
    id: 4,
    title: "Grilled Sandwich",
    description: "Ut enim ad minim veniam, quis nostrud exercitation",
    price: "$90",
    image: image4
  },
  {
    id: 5,
    title: "Cheese Salad",
    description: "Ullamco laboris nisi ut aliquip ex ea commodo consequat",
    price: "$70",
    image: image5
  },
  {
    id: 6,
    title: "Beef Steak",
    description: "Duis aute irure dolor in reprehenderit in voluptate",
    price: "$200",
    image: image6
  },
  {
    id: 7,
    title: "Chicken Wings",
    description: "Velit esse cillum dolore eu fugiat nulla pariatur",
    price: "$85",
    image: image7
  },
  {
    id: 8,
    title: "Ice Cream",
    description: "Excepteur sint occaecat cupidatat non proident",
    price: "$50",
    image: image8
  }
  ,
  {
    id: 9,
    title: "Rooti",
    description: "Excepteur sint occaecat cupidatat non proident",
    price: "$50",
    image: image5
  }
];

export default function Menu() {
  return (
    <div>
      <section className="menu-section">
        <div className="menu-header">
          <h3 className="menu-subtitle">Food Menu</h3>
          <h2 className="menu-title">Most Popular Items</h2>
          <div className="menu-categories">
            {/* <span className="menu-category active">
              <i className="icon-coffee"></i> Popular Breakfast
            </span>
            <span className="menu-category">
              <i className="icon-burger"></i> Special Lunch
            </span>
            <span className="menu-category">
              <i className="icon-dinner"></i> Lovely Dinner
            </span> */}
          </div>
        </div>

        <div className="menu-items">
          {menuItems.map(item => (
            <div className="menu-item" key={item.id}>
              <img src={item.image} alt={item.title} className="menu-item-image" />
              <div className="menu-item-details">
                <h4 className="menu-item-title">{item.title}</h4>
                <p className="menu-item-description">{item.description}</p>
              </div>
              <div className="menu-item-price">{item.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
