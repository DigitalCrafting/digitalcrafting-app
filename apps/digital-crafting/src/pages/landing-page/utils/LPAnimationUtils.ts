export const playPath = (path: SVGPathElement, packet: SVGRectElement, duration: number = 1000) => {
    return new Promise((resolve) => {
        // Reset animation if it was already used
        packet.classList.remove('animating');

        const pathData = path.getAttribute('d');
        packet.style.offsetPath = `path("${pathData}")`;
        packet.style.animationDuration = `${duration}ms`;

        void packet.style.offsetPath;

        packet.classList.add('animating');
        setTimeout(() => {
            packet.classList.remove('animating');
            void packet.style.offsetPath;
            requestAnimationFrame(() => resolve(true));
        }, duration)
    })
}

export const playNode = async (node: SVGUseElement, duration: number = 500) => {
    return new Promise((resolve) => {
        node.classList.remove('node-active');
        void node.style.color;
        node.classList.add('node-active');
        setTimeout(() => {
            node.classList.remove('node-active');
            void node.style.color;
            requestAnimationFrame(() => resolve(true));

        }, duration)
    })
}