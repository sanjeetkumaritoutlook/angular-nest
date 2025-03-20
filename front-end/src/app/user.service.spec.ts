import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import this
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // ✅ Provide HttpClientModule
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
