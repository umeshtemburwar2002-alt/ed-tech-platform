function sanitizeArray(value) {
    // If it's already an array, filter out empty values
    if (Array.isArray(value)) {
        return value.filter(item => {
            if (item === null || item === undefined) return false;
            if (typeof item === 'string' && item.trim() === '') return false;
            return true;
        });
    }
    
    // If it's a string, try to parse it or split by commas
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed === '') return [];
        try {
            const parsed = JSON.parse(trimmed);
            return sanitizeArray(parsed);
        } catch {
            return trimmed.split(',').map(s => s.trim()).filter(s => s !== '');
        }
    }
    
    // Default: return empty array
    return [];
}

module.exports = { sanitizeArray };
