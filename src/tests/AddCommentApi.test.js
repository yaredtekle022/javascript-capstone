/**
 * @jest-environment jsdom
 */

import { counter } from "../modules/AddCommentAPI.js";
/**
 * @jest-environment jsdom
 */


describe('add remove functionality', () => {
  document.body.innerHTML = `
 
     <span class='comment-pop'>test</span>
       `;

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([
        {
          comment: 'This is nice!',
          username: 'John',
        },
        {
          comment: 'This is  God!',
          username: 'Miki',
        },
        {
          comment: 'This is nice!',
          username: 'Dani',
        },
      ]),
    }));
    counter.container = document.getElementById('');
    counter.counternum = 'test';
  });

  describe('Check counter function', () => {
    it('Count fetch response', async () => {
      const count = await counter('test');
      expect(count).toHaveLength(3);
    });
  });
});