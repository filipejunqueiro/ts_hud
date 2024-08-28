import React, { useState } from "react";
import { Text, DEFAULT_THEME, Box } from '@mantine/core';
import { useNuiEvent } from "../hooks/useNuiEvent";
import { PiEngineFill } from "react-icons/pi";
import { FaFireFlameCurved, FaGasPump } from "react-icons/fa6";
import useStyles from '../hooks/useStyles';
import '../index.css';

const Vehicle: React.FC = () => {
  type VehInfo = {engineHealth?: number, fuel?: number, nitrous?: number};
  
  const { classes } = useStyles();
  const theme = DEFAULT_THEME;
  const [speed, setSpeed] = useState<number>(0);
  const [gear, setGear] = useState<number>(0);
  const [speedType, setSpeedType] = useState<string>('KMH');
  const [streetName1, setStreetName1] = useState<string>('OSLO');
  const [streetName2, setStreetName2] = useState<string>('FROGNER');
  const [heading, setHeading] = useState<string>('N');
  const [fuel, setFuel] = useState<number>(40);
  const [engineHealth, setEngineHealth] = useState<number>(50);
  const [nitrous, setNitrous] = useState<number>(50);
  const [isInVehicle, setIsInVehicle] = useState<boolean>(true);

  useNuiEvent<any>('vehicle', (data) => {
    setSpeed(data?.speed);
    setGear(data?.gear);
    setSpeedType(data?.speedType);
    setStreetName1(data?.streetName1 || 'UNKNOWN');
    setStreetName2(data?.streetName2 || 'UNKNOWN');
    setHeading(data?.heading || 'N');
    setFuel(data?.fuel || 100);
    setEngineHealth(data?.engineHealth || 100);
    setNitrous(data?.nitrous || 0);
    setIsInVehicle(data?.isInVehicle);
  });

  const renderVehInfoIndicators = (VehInfo: VehInfo) => {
    if(VehInfo?.engineHealth === undefined || VehInfo?.fuel === undefined || VehInfo?.nitrous === undefined) return;
    return(
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Engine */}
        <Box
          sx={{ 
            flexGrow: 1,
            height: 20,
            backgroundColor: theme.colors.dark[6], 
            border: `2px solid ${theme.colors.dark[7]}`,
            borderRadius: theme.radius.sm,
            position: 'relative',
            marginRight: 2,
          }}
        >
          <Box
            sx={{
              width: `${VehInfo?.engineHealth}%`,
              height: '100%',
              backgroundColor: theme.colors.yellow[3],
              borderRadius: theme.radius.sm,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 4,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PiEngineFill
                size={14}
                style={{
                  color: VehInfo?.engineHealth <= 26 ? 'white' : theme.colors.dark[6],
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* Fuel */}
        <Box
          sx={{ 
            flexGrow: 1,
            height: 20,
            backgroundColor: theme.colors.dark[6], 
            border: `2px solid ${theme.colors.dark[7]}`,
            borderRadius: theme.radius.sm,
            position: 'relative',
            marginRight: 2,
          }}
        >
          <Box
            sx={{
              width: `${VehInfo?.fuel}%`,
              height: '100%',
              backgroundColor: theme.colors.orange[3],
              borderRadius: theme.radius.sm,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 4,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaGasPump
                size={14}
                style={{
                  color: VehInfo?.fuel <= 18 ? 'white' : theme.colors.dark[6],
                }}
              />
            </Box>
          </Box>
        </Box>
        {VehInfo?.nitrous >= 1 && (
          <>
            {/* Nitrous */}
            <Box
              sx={{ 
                flexGrow: 1,
                height: 20,
                backgroundColor: theme.colors.dark[6], 
                border: `2px solid ${theme.colors.dark[7]}`,
                borderRadius: theme.radius.sm,
                position: 'relative',
                marginRight: 2,
              }}
            >
              <Box
                sx={{
                  width: `${VehInfo?.nitrous}%`,
                  height: '100%',
                  backgroundColor: theme.colors.violet[3],
                  borderRadius: theme.radius.sm,
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: 4,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaFireFlameCurved
                    size={14}
                    style={{
                      color: VehInfo?.nitrous <= 15 ? 'white' : theme.colors.dark[6],
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    );
  };

  const renderHeadingIndicators = (heading: string) => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '2px 10px',
        }}
      >
        <Text color={theme.colors.gray[4]} fw={700} size={17}>
          {heading}
        </Text>
      </Box>
    );
  };

  const renderStreetIndicators = (streetName1: string, streetName2: string) => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '2px 10px',
        }}
      >
        <Text color={theme.colors.gray[4]} fw={700} size={17}>
          {streetName1} {streetName2 && `| ${streetName2}`}
        </Text>
      </Box>
    );
  };

  const renderGearIndicators = (gear: number) => {
    return (
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 'auto',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px 10px',
        }}
      >
        <Text color={theme.colors.gray[4]} fw={700} size={20}>
          {gear === 0 ? 'R' : gear}
        </Text>
      </Box>
    );
  };
  
  const renderSpeedIndicators = (speed: number, speedType: string) => {
    return (
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '2px 10px',
        }}
      >
        <Text color={theme.colors.gray[4]} fw={700} size={20}>
          {speed.toString().padStart(3, '0')}
        </Text>
        <Text color={theme.colors.gray[4]} fw={700} size={20} style={{ marginLeft: 4 }}>
          {speedType.toUpperCase()}
        </Text>
      </Box>
    );
  };
  
  return (
    <div className={classes.wrapperVehicle}>
      {isInVehicle && (
          <Box className={classes.minimapContainer}>
            <Box className={classes.minimap}>
              {renderVehInfoIndicators({engineHealth: engineHealth, fuel:  fuel, nitrous: nitrous})}
              {renderHeadingIndicators(heading)}
              {renderStreetIndicators(streetName1, streetName2)}
              {renderGearIndicators(gear)}
              {renderSpeedIndicators(speed, speedType)}
            </Box>
          </Box>
      )}

    </div>
  );
}

export default Vehicle;
