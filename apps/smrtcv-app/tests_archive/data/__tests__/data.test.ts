// @ts-nocheck
import { aboutData } from '../about';
import { faqData } from '../faq';
import { testimonialsData } from '../testimonials';

describe('Static Data', () => {
  describe('About Data', () => {
    it('should have items', () => {
      expect(aboutData.length).toBeGreaterThan(0);
    });

    it('should have required fields in all items', () => {
      aboutData.forEach(item => {
        expect(item.id).toBeDefined();
        expect(item.title).toBeDefined();
        expect(item.content).toBeDefined();
        expect(item.category).toBeDefined();
      });
    });
  });

  describe('FAQ Data', () => {
    it('should have items', () => {
      expect(faqData.length).toBeGreaterThan(0);
    });

    it('should have valid topics', () => {
      const validTopics = ['General', 'Builder', 'Account', 'Templates', 'Billing'];
      faqData.forEach(item => {
        expect(validTopics).toContain(item.topic);
      });
    });
  });

  describe('Testimonials Data', () => {
    it('should have items', () => {
      expect(testimonialsData.length).toBeGreaterThan(0);
    });

    it('should have ratings between 1 and 5', () => {
      testimonialsData.forEach(item => {
        expect(item.rating).toBeGreaterThanOrEqual(1);
        expect(item.rating).toBeLessThanOrEqual(5);
      });
    });
  });
});
