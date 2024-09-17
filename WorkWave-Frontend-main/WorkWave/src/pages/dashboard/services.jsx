import React, { useState } from 'react';
import View from './service-components/view';
import Form from './service-components/form';
import FormUpdate from './service-components/form_update';

const Services = () => {
  const [currentView, setCurrentView] = useState('listView'); 
  const [selectedService, setSelectedService] = useState(null); 

  const handleListClick = () => {
    setCurrentView('listView'); 
  };

  const handleFormClick = () => {
    setCurrentView('formView'); 
  };

  const handleUpdateClick = (service) => {
    console.log('Selected service:', service); 
    setSelectedService(service); 
    setCurrentView('updateView'); 
  };

  const handleFormSuccess = () => {
    setCurrentView('listView'); 
  };

  return (
    <>
      {currentView === 'listView' && (
        <View onButtonClick={handleFormClick} onsingleClick={handleUpdateClick} />
      )}
      {currentView === 'formView' && (
        <Form onSuccess={handleFormSuccess} />  
      )}
      {currentView === 'updateView' && selectedService && (
        <FormUpdate service={selectedService} /> 
      )}
    </>
  );
};

export default Services;
