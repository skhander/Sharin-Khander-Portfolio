import { useState, type KeyboardEvent } from 'react';
import { usePageMeta } from '@/lib/use-page-meta';
import { DirectionBoard, type WorkType } from './direction-boards';
import './editorial-work.css';
import './showroom-media.css';

const workTypes = ['The RealReal', 'Personal'] as const;

export default function Work() {
  const [workType, setWorkType] = useState<WorkType>(workTypes[0]);
  usePageMeta('Work — Sharin Khander', 'I build smarter ways to shop. Work from The RealReal, plus personal projects.');

  const selectWorkType = (next: WorkType) => {
    setWorkType(next);
  };
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number, idPrefix = 'showroom') => {
    const nextIndex = event.key === 'ArrowRight' ? (index + 1) % workTypes.length
      : event.key === 'ArrowLeft' ? (index - 1 + workTypes.length) % workTypes.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? workTypes.length - 1 : -1;
    if (nextIndex < 0) return;
    event.preventDefault();
    selectWorkType(workTypes[nextIndex]);
    document.getElementById(`${idPrefix}-tab-${nextIndex}`)?.focus();
  };

  return (
    <DirectionBoard layout="showroom" workType={workType} onSelect={selectWorkType} onKeyDown={handleTabKeyDown} />
  );
}
