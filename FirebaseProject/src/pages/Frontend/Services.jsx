import React from 'react';
import { Card } from 'antd';
import { UserOutlined, ShoppingCartOutlined, ForkOutlined, PhoneOutlined } from '@ant-design/icons';
import '../../Scss/service.scss';

const { Meta } = Card;

const Services = () => {
  const cardData = [
    { title: 'Master Chefs', icon: <UserOutlined />, description: 'Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam' },
    { title: 'Quality Food', icon: <ForkOutlined />, description: 'Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam' },
    { title: 'Online Order', icon: <ShoppingCartOutlined />, description: 'Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam' },
    { title: '24/7 Service', icon: <PhoneOutlined />, description: 'Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam' },
  ];

  return (
    <div className="services-section">
      <h3 className="services-subtitle">Our Services</h3>
      <h2 className="services-title mb-3">Explore Our Services</h2>
      <div className="custom-grid">
        {cardData.map((card, index) => (
          <Card
            key={index}
            className="custom-card"
            hoverable
            cover={<div className="icon-wrapper">{card.icon}</div>}
          >
            <Meta title={card.title} description={card.description} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
