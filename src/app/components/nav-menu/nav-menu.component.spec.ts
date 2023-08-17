import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';
import { MenubarModule } from 'primeng/menubar/menubar';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    MockBuilder(NavMenuComponent, MenubarModule)
    await TestBed.configureTestingModule({
      imports: [MockBuilder(MenubarModule)],
      declarations: [ MockBuilder(NavMenuComponent) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const targetComponent =
    MockRender(NavMenuComponent).point.componentInstance;

    expect(component).toBeTruthy();
  });
});
