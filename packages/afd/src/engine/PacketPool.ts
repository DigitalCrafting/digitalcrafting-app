interface PoolItem {
    id: string,
    taken: boolean
}

export class PacketPool {
    private _pool: PoolItem[];

    constructor(poolSize: number = 20) {
        this._pool = [];
        this.init(poolSize);
    }

    private init(poolSize: number) {
        for (let i = 0; i < poolSize; i++) {
            this._pool.push({
                id: `packet${i+1}`,
                taken: false
            })
        }
    }

    public acquire(): string | undefined {
        const item = this._pool.find(item => !item.taken);
        if (!item) {
            return undefined;
        }
        item.taken = true;
        return item.id;
    }

    public release(id: string) {
        const item = this._pool.find(item => item.id === id);
        if (!item) {
            return;
        }
        item.taken = false;
    }

    public getPacketIds(): string[] {
        return this._pool.map(item => item.id);
    }
}

export const DEFAULT_PACKET_POOL = new PacketPool();