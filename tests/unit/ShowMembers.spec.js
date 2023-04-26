import { shallowMount, mount } from '@vue/test-utils'
import ShowMembers from '@/components/UI/ShowMembers.vue'
import store from '../../src/store/store.js'
import i18n from '../../src/i18n.js'

describe('showMembers', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(ShowMembers, {
        global: {
            plugins: [i18n],
            mocks: {
                $validator: {
                    validate: jest.fn(),
                    detach: jest.fn(),
                    attach: jest.fn(),
                    errors: {
                      clear: jest.fn(),
                    },
                  },
                  $route: {
                    params: {
                      id: 'test-id',
                    },
                  },
                  $apollo: {
                    mutate: jest.fn(),
                    query: jest.fn(() => Promise.resolve({ data: { group: { name: 'test', members: [] } } })),
                  },
            }
          },
        data() {
        return {
            groupInformations: {

                name: 'my group',
                members: [
                    { name: 'John', email: 'john@example.com' },
                    { name: 'Jane', email: 'jane@example.com' },
                ],
                photo: {
                    name: 'group.jpg',
                    size: 1024,
                    type: 'image/jpeg',
                    preview: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYE',
                },
                id: '123',
            },
            newGroupName: '',
            askingDelete: false,
            editGroupName: false,
            mailMember: '',
            showMembers: true,
            showEmailError: false
            };
        },
    });
  });
  afterEach(() => {
    wrapper.unmount()
  })
  it('should set askingDelete to true when messageDeleteGroup is called', () => {
    wrapper.vm.messageDeleteGroup();
    expect(wrapper.vm.askingDelete).toBe(true);
  });

  it('should emit goBackToGroupDropdown event and set CreateGroup to false when goBackToGroupDropdown is called', () => {
    wrapper.vm.goBackToGroupDropdown();
    expect(wrapper.emitted().goBackToGroupDropdown).toBeTruthy();
    expect(wrapper.vm.CreateGroup).toBe(false);
  });

  it('should return the status of the member at the given index when getStatus is called', () => {
    wrapper.setData({ groupInformations: { members: [{ mail: 'test@example.com', status: 'active' }] } });
    const status = wrapper.vm.getStatus(0);
    expect(status).toBe('active');
  });

  it('should add a new member to groupInformations.members when addMember is called with a valid email', () => {
    wrapper.setData({ mailMember: 'test@example.com', groupInformations: { members: [] } });
    wrapper.vm.addMember();
    expect(wrapper.vm.groupInformations.members.length).toBe(1);
    expect(wrapper.vm.groupInformations.members[0].mail).toBe('test@example.com');
    expect(wrapper.vm.groupInformations.members[0].status).toBe('pending');
    expect(wrapper.vm.groupInformations.members[0].admin).toBe(false);
  });
  
  it('should not add a new member to groupInformations.members when addMember is called with an invalid email', () => {
    wrapper.setData({ mailMember: 'invalidemail', groupInformations: { members: [] } });
    wrapper.vm.addMember();
    expect(wrapper.vm.groupInformations.members.length).toBe(0);
    expect(wrapper.vm.showEmailError).toBe(true);
  });

  it('should update the group name when updateGroupName is called with a valid name', async () => {
    wrapper.vm.v$ = {
      newGroupName: {
        $error: false,
      },
    };
    const newName = 'New Group Name';
    wrapper.vm.newGroupName = newName;

    await wrapper.vm.updateGroupName();

    expect(wrapper.vm.groupInformations.name).toBe(newName);
    expect(wrapper.vm.editGroupName).toBe(false);
  });
  

  it('should reset newGroupName and editGroupName to their original values when leaveEditName is called', () => {
    const initialGroupName = wrapper.vm.groupInformations.name;
    const newName = 'New Group Name';
    wrapper.vm.newGroupName = newName;
    wrapper.vm.editGroupName = true;

    wrapper.vm.leaveEditName();

    expect(wrapper.vm.newGroupName).toBe(initialGroupName);
    expect(wrapper.vm.editGroupName).toBe(false);
  });

  it('should set askingDelete to false when leaveAskingDelete is called', () => {
    wrapper.vm.askingDelete = true;

    wrapper.vm.leaveAskingDelete();

    expect(wrapper.vm.askingDelete).toBe(false);
  });

  it('should delete the group picture when deleteGroupPicture is called', () => {
    wrapper.setData({
      groupInformations: {
        photo: {
          name: 'group.jpg',
          preview: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYE',
          size: 1024,
          type: 'image/jpeg',
        },
      },
    });

    wrapper.vm.deleteGroupPicture();

    expect(wrapper.vm.groupInformations.photo).toEqual({
      name: '',
      preview: '',
      size: '',
      type: '',
    });
  });

});

test('Basic Information verifier', async () => {
    const wrapper = shallowMount(ShowMembers, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
            },
            stubs: {
                'font-awesome-icon': {
                    template: '<i />',
                },
            },
        },
        data() {
            return {
                groupInformations: {
                    name: "Vakary",
                    members: [],
                    photo: {
                        name: "photo.png",
                        size: 20,
                        type: "type",
                        preview: "preview",
                    },
                    id: "1",
                },
                editGroupName: false,
                newGroupName: "Vak",
                mailMember: 'mail@test.com',
                showMembers: true,
            }
        }
    })
    wrapper.vm.$data.groupInformations = {
        name: "Vakary",
        members: [],
        photo: {
            name: "photo.png",
            size: 20,
            type: "type",
            preview: "preview",
        },
        id: "1",
        preview: "test",
    }
    await wrapper.vm.addMember()
    await wrapper.vm.deleteMember(0)
    await wrapper.vm.editName()
    await wrapper.vm.updateGroupName()
    await wrapper.vm.deleteGroup()

    expect(wrapper.vm.getGroups).toBe(wrapper.vm.$store.state.userStore.groups)
})

test('Error check', async () => {
    const wrapper = shallowMount(ShowMembers, {
        global: {
            mocks: {
                $store: store,
                $t: (msg) => msg,
            },
            stubs: {
                'font-awesome-icon': {
                    template: '<i />',
                },
            },
        },
        data() {
            return {
                groupInformations: {
                    name: "Vakary",
                    members: [{mail: "mail@test.fr", status: "pending"}, {mail: "mail2@test.fr", status: "pending"}],
                    photo: {
                        name: "photo.png",
                        size: 20,
                        type: "type",
                        preview: "preview",
                    },
                    id: "1",
                    preview: "test",
                },
                editGroupName: false,
                newGroupName: "Vak",
                mailMember: 'mail@test.com',
                showMembers: true,
            }
        }
    })
    wrapper.vm.$data.groupInformations = {
        name: "Vakary",
        members: [],
        photo: {
            name: "photo.png",
            size: 20,
            type: "type",
            preview: "preview",
        },
        id: "1",
        preview: "test",
    }
    await wrapper.vm.addMember();
    await wrapper.vm.updateGroupName();
})
