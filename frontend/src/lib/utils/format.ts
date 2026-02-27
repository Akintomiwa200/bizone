export function formatDate(date: string | Date): string {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

export function formatCount(count: number): string {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M'
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
}
