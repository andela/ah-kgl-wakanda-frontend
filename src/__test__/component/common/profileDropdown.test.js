import React from 'react';
import { shallow } from 'enzyme';
import ProfileDropdown from '../../../Components/Common/Profile/ProfileDropdown';
import img from '../../../assets/img/images.png';

const props = {
  username: '@gisel',
  picture: img,
};
describe('Render the Profile Dropdown component', () => {
  it('should display button', async () => {
    const dropdown = shallow(<ProfileDropdown {...props} />);
    expect(dropdown).toMatchSnapshot();
    expect(dropdown.find('button'));
    expect(dropdown.find('img'));
    expect(dropdown.find('span'));
  });
  it('should display the dropdown', async () => {
    const dropdown = shallow(<ProfileDropdown {...props} />);
    expect(dropdown.find('.dropdown-menu'));
    expect(dropdown.find('a'));
  });
});
