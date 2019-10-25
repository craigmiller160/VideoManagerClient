import FlexRow from 'components/UI/Grid/FlexRow';
import mountTestComponent from '../../../exclude/testUtil/mountTestComponent';

const doMount = mountTestComponent(FlexRow);

describe('FlexRow', () => {
    it('renders without custom props', () => {
        const { component } = doMount();
        expect(component).toHaveStyleRule('justify-content', 'flex-start');
        expect(component).toHaveStyleRule('align-items', 'stretch');
    });

    it('renders with custom props', () => {
        const { component } = doMount({
            props: {
                justifyContent: 'center',
                alignItems: 'flex-start'
            }
        });
        expect(component).toHaveStyleRule('justify-content', 'center');
        expect(component).toHaveStyleRule('align-items', 'flex-start');
    });
});