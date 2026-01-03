// Helper to prefix paths with basePath for static export
// In production (GitHub Pages), images need the basePath prefix
const basePath = process.env.NODE_ENV === 'production' ? '/portfolio1' : '';

export function getAssetPath(path) {
    // If path already starts with basePath or is external, return as-is
    if (path.startsWith('http') || path.startsWith(basePath)) {
        return path;
    }
    // Add basePath prefix
    return `${basePath}${path}`;
}

export default basePath;
