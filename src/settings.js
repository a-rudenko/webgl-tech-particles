export async function loadSettings() {
    const response = await fetch('./settings.json');
    if (!response.ok) {
        throw new Error('Failed to load settings.json');
    }
    return await response.json();
}

export const exportSettings = (settings) => {
    const json = JSON.stringify(settings, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings.json';
    a.click();
    URL.revokeObjectURL(url);
};