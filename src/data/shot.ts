export type ShotData = {
    id: string
    label?: string
    name?: string
    description?: string
    type?: string,
    cover?: string
    position: { x: number, y: number }
}

export const shots: ShotData[] = [
    {
        id: '1',
        label: '1',
        name: 'A-1',
        description: 'The Potala Palace is a dzong fortress in Lhasa, capital of the Tibet Autonomous Region in China. It was the winter palace of the Dalai Lamas from 1649 to 1959, has been a museum since then, and a World Heritage Site since 1994.',
        type: 'mv',
        cover: '/image.png',
        position: {x: 50, y: 50}
    },
    {
        id: '2',
        label: '2',
        name: 'B-1',
        description: 'The Potala Palace is a dzong fortress in Lhasa, capital of the Tibet Autonomous Region in China. It was the winter palace of the Dalai Lamas from 1649 to 1959, has been a museum since then, and a World Heritage Site since 1994.',
        type: 'mv',
        cover: '/image2.png',
        position: {x: 450, y: 50}
    },
    {
        id: '3',
        label: '3',
        name: 'C-1',
        description: 'The Potala Palace is a dzong fortress in Lhasa, capital of the Tibet Autonomous Region in China. It was the winter palace of the Dalai Lamas from 1649 to 1959, has been a museum since then, and a World Heritage Site since 1994.',
        type: 'mv',
        cover: '/image2.png',
        position: {x: 650, y: 450}
    }
]

export type EdgeData = {
    id: number | string
    from: string
    to: string
}

export const edges: EdgeData[] = [
    {id: 1, from: '1', to: '2'}
]