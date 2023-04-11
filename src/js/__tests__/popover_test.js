/**
 * @jest-environment jsdom
 */

import Popover from '../popover.js'

test('popover should be called', () => {
    document.body.innerHTML = '<div class="popover"><button type="button" class="btn" data-container="body">Popover on top</button></div>';
    const button = document.querySelector('.btn');
    const popover = new Popover(button);

    button.click();

    const tooltip = document.querySelector('.tooltip');
    expect(document.querySelector('.msg').textContent).toEqual(`And here\'s some amazing content. It\'s very engaging. Right?`);
  });