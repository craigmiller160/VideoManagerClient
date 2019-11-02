
export default async (component) => {
    await Promise.resolve(component);
    await new Promise((resolve) => setImmediate(resolve));
};
