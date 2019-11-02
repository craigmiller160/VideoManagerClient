import { act } from 'react-dom/test-utils';

export default async (component) => {
    await act(async () => {
        await Promise.resolve(component);
        await new Promise((resolve) => setImmediate(resolve));
        component.update();
    });
};
