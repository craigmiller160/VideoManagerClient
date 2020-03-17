import FlexRow from 'components/UI/Grid/FlexRow';
import enzymeCreator from 'react-enzyme-utils';

const mounter = enzymeCreator({
    component: FlexRow
});

describe('FlexRow', () => {
    it('renders without custom props', () => {
        const { component } = mounter();
        expect(component).toHaveStyleRule('justify-content', 'flex-start');
        expect(component).toHaveStyleRule('align-items', 'stretch');
    });

    it('renders with custom props', () => {
        const { component } = mounter({
            props: {
                justifyContent: 'center',
                alignItems: 'flex-start'
            }
        });
        expect(component).toHaveStyleRule('justify-content', 'center');
        expect(component).toHaveStyleRule('align-items', 'flex-start');
    });
});