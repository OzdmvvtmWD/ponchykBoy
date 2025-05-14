import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect, useRef } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {Map ,Marker } from '@vis.gl/react-maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

import "./ModalShopInfo.css"

function ModalShopInfo(props) {
  const [shopAdress,getShopAdress] = useState([])
  const [activeId, setActiveId] = useState(null);

  const [viewState, setViewState] = useState({
    longitude: 31.1828699,
    latitude:  48.383022,
    zoom: 3.5
    
  });

  useEffect(() => {
    fetch('http://localhost:8000/shops/',{
      headers: {
        'Content-Type': 'application/json',
      },

    })

      .then(response => response.json())
      .then((data) => {
        getShopAdress(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []); 

  const handleListItemClick = (lon, lat, id) => {
        setViewState({
          longitude: lon,
          latitude: lat,
          zoom: 10
        });
        setActiveId(id);
      };

 

  return (
    <Modal
    {...props}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Choose a pickup location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <ListGroup className="shop-list">
          {shopAdress.map((adress) => (
            <ListGroup.Item key={adress.id} active={adress.id === activeId} onClick={() => handleListItemClick(adress.lon,adress.lat,adress.id)} >
              {adress.adress}
            </ListGroup.Item>
          ))}
          </ListGroup>
         <Map
    {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: 600, height: 400}}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        
        {shopAdress.map((adress) => (
          <Marker key={adress.id} active={adress.id === activeId} longitude={adress.lon} latitude={adress.lat} onClick={() => setActiveId(adress.id)} >
          </Marker>
          ))}
      </Map>
      </Modal.Body>
      <Modal.Footer>
      <Button
        onClick={() => {
          const selected = shopAdress.find((item) => item.id === activeId);
          if (selected) {
            props.chooseAdress(selected);
          }          
        }
      }
      disabled={!activeId}
      >
        Choose
      </Button>
       
      </Modal.Footer>
    </Modal>
  );

}

export default ModalShopInfo;
