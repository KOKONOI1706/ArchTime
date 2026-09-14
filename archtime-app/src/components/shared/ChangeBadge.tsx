interface ChangeBadgeProps {
  typeKey: string;
  label?: string;
  className?: string;
}

const badgeClassMap: Record<string, string> = {
  SERVICE_EXTRACTION: 'change-badge-extraction',
  MODULE_SPLIT:       'change-badge-split',
  PACKAGE_RESTRUCTURE:'change-badge-restructure',
  NEW_MODULE:         'change-badge-new',
  DEPENDENCY_CHANGE:  'change-badge-dependency',
  MICROSERVICE_MIGRATION: 'change-badge-migration',
  INITIAL:            'change-badge-initial',
};

const labelMap: Record<string, string> = {
  SERVICE_EXTRACTION:     'Svc Extraction',
  MODULE_SPLIT:           'Module Split',
  PACKAGE_RESTRUCTURE:    'Pkg Restructure',
  NEW_MODULE:             'New Module',
  DEPENDENCY_CHANGE:      'Dep Change',
  MICROSERVICE_MIGRATION: 'Microservice Mig',
  INITIAL:                'Initial',
};

export default function ChangeBadge({ typeKey, label, className = '' }: ChangeBadgeProps) {
  const badgeCls = badgeClassMap[typeKey] ?? 'change-badge-initial';
  const displayLabel = label ?? labelMap[typeKey] ?? typeKey;

  return (
    <span className={`change-badge ${badgeCls} ${className}`}>
      {displayLabel}
    </span>
  );
}
