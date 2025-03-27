import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { render } from '@testing-library/angular';

import { SimpleComponent } from './simple.component';

describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
  //snapshot test using nativeElement: option 1
  it('should match snapshot', () => {
    expect(fixture.nativeElement.innerHTML).toMatchSnapshot();
  });

  //snapshot test using render: option 2
  // it('should match snapshot', async () => {
  //   const { container } = await render(SimpleComponent);
  //   expect(container).toMatchSnapshot();
  // });
});
