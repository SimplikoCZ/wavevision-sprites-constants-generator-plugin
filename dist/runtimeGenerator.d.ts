type RuntimeGenerator = {
    symbol: {
        id: string;
    };
};
declare const runtimeGenerator: ({ symbol }: RuntimeGenerator) => string;
export = runtimeGenerator;
