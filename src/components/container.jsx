import React from 'react';
import styled from 'styled-components';

// Import your seashell images here
import coquillageImage1 from '../assets/img/coquillage1.png';
import coquillageImage2 from '../assets/img/coquillage2.png';

const ElementContainer = styled.div`
  position: absolute;
`;

const Coquillage = styled(ElementContainer)`
  width: 120px;
  height: 120px;
  background: url(${(props) => props.image}) center/cover no-repeat;
  transform: rotate(${(props) => props.rotation}deg); /* Apply rotation */
`;

const SmallCoquillage = styled(Coquillage)`
  width: 80px; /* Adjust the width for coquillageImage2 */
  height: 80px; /* Adjust the height for coquillageImage2 */
`;

const CoquillesContainer = ({ predefinedCoordinates }) => {
  
  console.log(predefinedCoordinates);

  return (
    <div>
      
      {predefinedCoordinates.map((coordinate, index) => (
        <div key={index}>
          {index % 2 === 0 ? (
            <Coquillage
              rotation={Math.random() * 360} // Generate a random rotation value
              image={coquillageImage1}
              style={{
                top: coordinate.top,
                left: coordinate.left,
              }}
            />
          ) : (
            <SmallCoquillage
              rotation={Math.random() * 360} // Generate a random rotation value
              image={coquillageImage2}
              style={{
                top: coordinate.top,
                left: coordinate.left,
              }}
            />
          )}
        </div>
      ))}


    </div>
  );
};

export default CoquillesContainer;
