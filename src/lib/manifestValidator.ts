export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  line?: number;
  column?: number;
  message: string;
  type: 'error' | 'warning';
}

export function validateManifest(xmlContent: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (!xmlContent.trim()) {
    return {
      isValid: false,
      errors: [{ message: 'Manifest content is empty', type: 'error' }]
    };
  }

  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');

    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      const errorText = parserError.textContent || 'Unknown XML parsing error';
      errors.push({
        message: errorText,
        type: 'error'
      });
      return { isValid: false, errors };
    }

    const manifest = xmlDoc.querySelector('manifest');
    if (!manifest) {
      errors.push({
        message: 'Root <manifest> element is required',
        type: 'error'
      });
      return { isValid: false, errors };
    }

    if (!manifest.hasAttribute('package')) {
      errors.push({
        message: 'manifest element requires "package" attribute',
        type: 'error'
      });
    }

    const packageName = manifest.getAttribute('package');
    if (packageName && !isValidPackageName(packageName)) {
      errors.push({
        message: `Invalid package name: "${packageName}". Must follow Java package naming conventions`,
        type: 'warning'
      });
    }

    const application = xmlDoc.querySelector('application');
    if (!application) {
      errors.push({
        message: '<application> element is required inside <manifest>',
        type: 'error'
      });
    }

    const activities = xmlDoc.querySelectorAll('activity');
    activities.forEach((activity, index) => {
      if (!activity.hasAttribute('android:name')) {
        errors.push({
          message: `Activity at position ${index + 1} is missing "android:name" attribute`,
          type: 'error'
        });
      }
    });

    if (errors.length === 0) {
      return { isValid: true, errors: [] };
    }

    return { isValid: false, errors };

  } catch (error) {
    return {
      isValid: false,
      errors: [{
        message: error instanceof Error ? error.message : 'Failed to parse XML',
        type: 'error'
      }]
    };
  }
}

function isValidPackageName(packageName: string): boolean {
  const packageRegex = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/;
  return packageRegex.test(packageName);
}

export function extractManifestInfo(xmlContent: string) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
    const manifest = xmlDoc.querySelector('manifest');

    if (!manifest) {
      return null;
    }

    const packageName = manifest.getAttribute('package') || '';
    const permissions: string[] = [];
    const activities: string[] = [];

    xmlDoc.querySelectorAll('uses-permission').forEach(perm => {
      const name = perm.getAttribute('android:name');
      if (name) permissions.push(name);
    });

    xmlDoc.querySelectorAll('activity').forEach(activity => {
      const name = activity.getAttribute('android:name');
      if (name) activities.push(name);
    });

    return {
      packageName,
      permissions,
      activities,
      hasApplication: !!xmlDoc.querySelector('application')
    };

  } catch {
    return null;
  }
}
