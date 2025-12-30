// @ts-nocheck
import { useResumeStore } from '../resumeStore';
import { blankResume } from '@/data/resume';
import { Resume } from '@/types/resume';

describe('resumeStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useResumeStore.setState({
      resume: blankResume,
      sectionOrder: ['basics', 'work', 'education', 'skills', 'projects', 'languages', 'certificates'],
    });
  });

  it('should initialize with blank resume', () => {
    const state = useResumeStore.getState();
    expect(state.resume).toEqual(blankResume);
  });

  it('should update a field using dot notation', () => {
    const { updateField } = useResumeStore.getState();
    updateField('basics.name', 'John Doe');
    
    const state = useResumeStore.getState();
    expect(state.resume.basics.name).toBe('John Doe');
  });

  it('should update a nested field in an array', () => {
    const { updateField } = useResumeStore.getState();
    updateField('work.0.name', 'Tech Corp');
    
    const state = useResumeStore.getState();
    expect(state.resume.work[0].name).toBe('Tech Corp');
  });

  it('should add a new section entry', () => {
    const { addSection } = useResumeStore.getState();
    const initialCount = useResumeStore.getState().resume.work.length;
    
    addSection('work');
    
    const state = useResumeStore.getState();
    expect(state.resume.work.length).toBe(initialCount + 1);
  });

  it('should remove a section entry', () => {
    const { addSection, removeSection } = useResumeStore.getState();
    addSection('work');
    const countAfterAdd = useResumeStore.getState().resume.work.length;
    
    removeSection('work', countAfterAdd - 1);
    
    const state = useResumeStore.getState();
    expect(state.resume.work.length).toBe(countAfterAdd - 1);
  });

  it('should update a string array from comma-separated string', () => {
    const { updateStringArray } = useResumeStore.getState();
    updateStringArray('skills.0.keywords', 'React, TypeScript, Node.js');
    
    const state = useResumeStore.getState();
    expect(state.resume.skills[0].keywords).toEqual(['React', 'TypeScript', 'Node.js']);
  });

  it('should reorder sections', () => {
    const { reorderSections } = useResumeStore.getState();
    const newOrder: (keyof Resume)[] = ['basics', 'skills', 'work'];
    
    reorderSections(newOrder);
    
    const state = useResumeStore.getState();
    expect(state.sectionOrder).toEqual(newOrder);
  });
});
