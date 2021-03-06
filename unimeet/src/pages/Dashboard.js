import { NavBar2 } from '../components/Navigation'
import { auth } from "../components/Firebase";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, Button } from 'react-bootstrap';
/* The lines below are for the map. I would not recommend touching :) */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
/* Changed the default Icon image. This is a leaflet error. Had to assign an object to replace it */
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

/*-------------------------End of Leaflet stuff------------------*/
/*Coordinate locations of UNCC buildings. You may add more as needed. Just make sure you add a radio button as well.*/
const student_union = [35.308930837902004, -80.73367559555146];
const sac = [35.3065975452604, -80.73450174470625];
const atkins_library = [35.30583581384564, -80.73238816397159];
const cone = [35.30544458961595, -80.73322067039553];


export const Dashboard = () => {
  const [didMount, setDidMount] = useState(false); 
  const navigate = useNavigate();
  const [userdata] = useAuthState(auth);
  useEffect(() => {

    setDidMount(true);
    if(!didMount) {
      return null;
    }

    if (!userdata) {

      navigate('/')

    }
    

  }, [userdata])

  return (
    <div className="textBackground">
      <NavBar2 />
      <h1> This is the Dashboard</h1>
      <Inputbox />
    </div>

  );

}

const Inputbox = () => {
  const [userEvents, setUserEvents] = useState(null);
  const [location, setLocation] = useState("");
  return (
    <div>
      <Form onSubmit={(e) => { e.preventDefault() }}>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Label>Input locations</Form.Label>
          <Form.Control type="text" onSubmit={(e) => { e.preventDefault() }} />
        </Form.Group>
        <Button variant="primary" type="button" onClick={(e) => { e.preventDefault() }}>
          Submit
        </Button>
        {/* All this does is create the radio button layout using map(kinda like a foreach loop) */}
        {/*Changes the value of location variable when you choose a different radio button*/}
        {['radio'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="Student Union"
              name="group1"
              type={type}
              value={student_union}
              id={`inline-${type}-1`}
              onChange={(e) => (setLocation(e.currentTarget.value))}
            />
            <Form.Check
              inline
              label="Atkins Library"
              name="group1"
              type={type}
              value={atkins_library}
              onChange={(e) => (setLocation(e.currentTarget.value))}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              label="Cone Student Center"
              name="group1"
              type={type}
              value={cone}
              onChange={(e) => (setLocation(e.currentTarget.value))}
              id={`inline-${type}-3`}
            />
            <Form.Check
              inline
              label="Student Activity Center"
              name="group1"
              type={type}
              value={sac}
              onChange={(e) => (setLocation(e.currentTarget.value))}
              id={`inline-${type}-4`}
            />
          </div>
        ))}
      </Form>
      <div>
        <Mapapi markerdata={userEvents} />
      </div>
    </div>

  )

}



const Mapapi = (props) => {
  {/* Todo -> Replace if statement with default value types for this component*/ }

  if (props.markerdata == null) {
    return (
      <div className="leaflet-container">
        <MapContainer
          center={[35.307880571109386, -80.73370127156109]}
          zoom={16}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={student_union}>
            <Popup>
              Student Union
            </Popup>
          </Marker>
          <Marker position={sac}>
            <Popup>
              Student Activity Center
            </Popup>
          </Marker>
          <Marker position={atkins_library}>
            <Popup>
              Atkins Library
            </Popup>
          </Marker>
          <Marker position={cone}>
            <Popup>
              Cone University Center
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  } else {
    return (

      <div className="leaflet-container">
        <MapContainer
          center={[35.307880571109386, -80.73370127156109]}
          zoom={16}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[props.markerdata[0], props.markerdata[1]]}>
            <Popup>
              Student Union
            </Popup>
          </Marker>
        </MapContainer>
      </div>

    )
  }


}
