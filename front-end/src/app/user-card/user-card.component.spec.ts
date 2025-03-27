import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { By } from '@angular/platform-browser';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;

     // ✅ Provide a mock user object
     component.user = {
      name: 'John Doe',
      role: 'Admin',
      email: 'john.doe@example.com', 
    };

    fixture.detectChanges(); // ✅ Call after setting user
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //new test cases below:
  it('should match snapshot with default user', () => {
    component.user = { name: 'John Doe', email: 'john@example.com', role: 'Admin' };
    fixture.detectChanges();
    
    expect(fixture.nativeElement.innerHTML).toMatchSnapshot();
  });

  it('should emit event when button is clicked', () => {
    jest.spyOn(component.userSelected, 'emit');
    
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    console.log(component.user);
     // Expect only the user's name to be emitted
   expect(component.userSelected.emit).toHaveBeenCalledWith(component.user.name);

  });
  it('should match snapshot with another user', () => {
    component.user = { name: 'Jane Smith', email: 'jane@example.com', role: 'User' };
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toMatchSnapshot();
  });

  it('should emit event when button is clicked', () => {
    component.user = { name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' };
    fixture.detectChanges();

    jest.spyOn(component.userSelected, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.userSelected.emit).toHaveBeenCalledWith('Alice Brown');
  });
});
