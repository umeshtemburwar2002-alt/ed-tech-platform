export function sanitizeArray(value) {
  if (Array.isArray(value)) {
    return value.filter(item => item !== null && item !== undefined && item !== '');
  }
  
  if (value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === '')) {
    return [];
  }
  
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return sanitizeArray(parsed);
    } catch {
      return [value.trim()];
    }
  }
  
  return [];
}

export function sanitizeCoursePayload(payload) {
  return {
    ...payload,
    tags: sanitizeArray(payload.tags),
    requirements: sanitizeArray(payload.requirements),
    benefits: sanitizeArray(payload.benefits),
    learning_outcomes: sanitizeArray(payload.learning_outcomes),
    skills: sanitizeArray(payload.skills),
    curriculum: sanitizeArray(payload.curriculum),
    prerequisites: sanitizeArray(payload.prerequisites)
  };
}
