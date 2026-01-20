// import { render,screen,waitFor,vi } from '@testing-library/react';
// import CreateMatch from './create-match';
// import "@testing-library/jest-dom/vitest";

// describe(CreateMatch,()=>{
//     it('should display header text',()=>{
//       render(<CreateMatch/>);
//         const headerText = screen.getByTestId("header").textContent;
//         expect(headerText).toEqual("Create Match");
//     })
// })

// describe("UserProfile", () => {
//     beforeEach(() => {
//       global.fetch = vi.fn();
//     });
  
//     afterEach(() => {
//       vi.resetAllMocks();
//     });
  
//     it("fetches and displays the user data", async () => {
//       global.fetch.mockResolvedValueOnce({
//         json: async () => ({ id: 4, name: "John", email: "john@gmail.com" }),
//       });
//       render(<CreateMatch/>);
  
//       expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
//       await waitFor(() => {
//         expect(
//           screen.getByRole("heading", { name: /john/i })
//         ).toBeInTheDocument();
//         expect(screen.getByText(/john@gmail.com/i)).toBeInTheDocument();
//       });
//     });
//   });