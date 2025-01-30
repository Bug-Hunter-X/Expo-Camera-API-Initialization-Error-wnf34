import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';

const CameraComponent = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraReady = async () => {
    const cameraStatus = await cameraRef.current.getStatusAsync();
    setCameraReady(cameraStatus.isRecording === false && cameraStatus.isTakingPhoto === false);
  };

  if (hasPermission === null) {
    return <View>Requesting Camera Permission...</View>;
  }
  if (hasPermission === false) {
    return <View>No access to camera</View>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={type}
        onCameraReady={handleCameraReady}
      >
        {cameraReady && (
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Button title="Flip Camera" onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}/>
          </View> 
        )}
      </Camera>
    </View>
  );
};

export default CameraComponent;