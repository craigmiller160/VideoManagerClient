import React from 'react';
import { mount } from 'enzyme';
import App from 'App';

jest.mock('components/AppContent/AppContent', () => {
    const AppContent = (props) => <div { ...props } />;
    return AppContent;
});

describe('App', () => {
    it('renders properly', () => {
        const component = mount(<App/>);
        expect(component.find('HelmetWrapper')).toHaveLength(1);
        expect(component.find('Provider')).toHaveLength(1);
        expect(component.find('BrowserRouter')).toHaveLength(1);
        expect(component.find('ThemeProvider')).toHaveLength(1);
        expect(component.find('AppContent')).toHaveLength(1);
    });
});