import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { LocationMarkerIcon } from '@heroicons/react/solid';

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  //    Transform the search results object into the
  //    { latitude: 52,51111, longitude: 13.37777 } object

  const coordinate = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //    The latitude and longitude of the center of location coordinates
  const center = getCenter(coordinate);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/leonardo95/ckvcks43editg14p88rn2bf0s"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetTop={-10}
            offsetLeft={-20}
          >
            <p
              role="img"
              onClick={() => {
                setSelectedLocation(result);
              }}
              className="cursor-pointer text-2xl hover:animate-bounce"
              aria-label="push-pin"
            >
              <LocationMarkerIcon className=" h-7 bg-trasparent text-red-400" />
            </p>
          </Marker>

          {/* The popup that should show if we click on a Marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
