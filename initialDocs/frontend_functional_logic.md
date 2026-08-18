# Frontend Functional Logic Architecture

> [!NOTE]
> **Document Purpose**: This specification defines the functional architecture, state machines, data flow, and React component structure for the core interactive modules of the platform.

---

## 1. Multi-Step Form (Lens Builder / Intake Form)

**State Machine Structure**
* `IDLE` ➔ `GATHERING_INPUT` (User interaction) ➔ `VALIDATING_STEP` ➔ `TRANSITIONING` ➔ Next Step.
* Final Step: `SUBMITTING` ➔ `SUCCESS` | `ERROR`.

**Data Flow**
* **Props**: `initialData`, `stepsConfig` (array of step definitions), `onSubmit`.
* **Events**: `onNext`, `onPrev`, `onChange`, `onBlur` (for field-level validation).
* **API Patterns**: Local state for the current step. Context/Zustand for the aggregated global payload. Form data is persisted to `localStorage` or `sessionStorage` on each step change to prevent data loss.

**Error Management Strategy**
* **Field Level**: Inline validation using Zod/Yup triggered `onBlur` and `onSubmit`.
* **Step Level**: Prevent transition if step-level invariant is violated.
* **Global Submission**: Toast notification for server errors.

**Loading Behavior**
* Primary buttons enter a disabled/spinner state during async validation or final submission.
* Step transitions use a 150ms crossfade animation to prevent jarring layout shifts.

**Empty State UX**
* If the user starts fresh, show intelligent defaults (e.g., standard 1.50 index).

**Edge Case Handling**
* **Direct URL Access**: If a user navigates directly to `/builder/step-3` without completing step 1, the router guard redirects them back to the first incomplete step.
* **Session Expiry**: If the user leaves the tab open for hours, `localStorage` hydration recovers their progress.

---

## 2. Real-Time Pricing Calculator

**State Machine Structure**
* `STABLE` ➔ `COMPUTING` (Fetching complex pricing rules from API or running heavy local calc) ➔ `STABLE`.

**Data Flow**
* **Props**: `basePrice`, `selectedOptions`, `pricingRules` (if computed locally).
* **Events**: `onOptionsChange`.
* **API Patterns**: If pricing requires server validation (e.g., applying dynamic promos or insurance), use a debounced (300ms) API call. If local, use `useMemo` for immediate calculation.

**Error Management Strategy**
* **Invalid Combinations**: If user selects options that conflict (e.g., Progressive Lenses on a frame with insufficient height), highlight the conflict in red, disable the "Add to Cart" button, and show a resolution tooltip.

**Loading Behavior**
* Do not hide the price. Instead, apply a skeleton overlay or pulse animation on the pricing integer to indicate it is updating.

**Empty State UX**
* Show `basePrice` with a "Select options to see final price" microcopy.

**Edge Case Handling**
* **Race Conditions**: If the user clicks multiple options rapidly, utilize an `AbortController` on the pricing API to cancel stale requests and only resolve the most recent one.

---

## 3. Faceted Search (PLP)

**State Machine Structure**
* `IDLE` ➔ `FETCHING` ➔ `SUCCESS` (Render Grid) | `ERROR` (Show Retry).
* `UPDATING_FILTERS` (Optimistic UI update) ➔ `FETCHING`.

**Data Flow**
* **Props**: `initialProducts`, `availableFacets`.
* **Events**: `onFilterToggle`, `onSortChange`, `onPageChange`.
* **API Patterns**: URL Search Parameters (e.g., `?color=black&shape=round`) are the **Single Source of Truth**. The component subscribes to router changes and fetches via SWR/React Query. 

**Error Management Strategy**
* If the search service goes down, fallback to a cached response or display a graceful error state with a "Reload" CTA.

**Loading Behavior**
* Use a skeleton grid matching the exact dimensions of the `ProductCard` to prevent Cumulative Layout Shift (CLS).
* Keep existing products visible but slightly dimmed while the new filtered batch is fetching.

**Empty State UX**
* "No products match these filters." 
* Provide a high-visibility "Clear All Filters" button.
* Display a carousel of "Trending Products" below the empty state to keep the user engaged.

**Edge Case Handling**
* **Mutually Exclusive Filters**: Automatically uncheck conflicting filters (e.g., selecting both "Men" and "Women" might reset to unisex if not supported).
* **Out of Bounds Pagination**: Redirect to page 1 if the user manually enters a page number exceeding the total pages.

---

## 4. User Dashboard (Analytics & CRUD)

**State Machine Structure**
* **Read**: `INITIAL_LOAD` ➔ `DATA_READY`.
* **Mutate**: `IDLE` ➔ `SAVING` ➔ `SUCCESS` | `FAILURE` (Revert).

**Data Flow**
* **Props**: `userId`.
* **Events**: `onCreate`, `onUpdate`, `onDelete`.
* **API Patterns**: React Query mutations with **Optimistic Updates**. When a user deletes a saved prescription, immediately remove it from the UI, execute the API call, and roll back if the API fails.

**Error Management Strategy**
* Toast notifications for all mutation failures.
* Inline contextual errors for form validations within modals.

**Loading Behavior**
* Table row skeletons for lists.
* Specific button spinners for precise CRUD actions (don't block the whole page).

**Empty State UX**
* **Lists**: "You have no saved prescriptions." + "Upload Prescription" CTA.
* **Charts/Analytics**: "Not enough data yet. Complete an order to view your visual history."

**Edge Case Handling**
* **Concurrent Modifications**: ETag / Version tracking on the backend. If the user edits a record that was modified elsewhere, show a "Conflict" dialog to refresh data.

---

## 5. Full Authentication Lifecycle

**State Machine Structure**
* `UNKNOWN` ➔ `UNAUTHENTICATED` ➔ `AUTHENTICATING` ➔ `AUTHENTICATED`.

**Data Flow**
* **Props**: `redirectUrl`.
* **Events**: `onSubmitCredentials`, `onOAuthLogin`, `onLogout`.
* **API Patterns**: Secure HttpOnly cookies for JWT access/refresh tokens. The frontend never stores tokens in `localStorage`. A `/api/auth/me` endpoint determines session state on hydration.

**Error Management Strategy**
* **Form**: "Invalid email or password."
* **Security**: "Account locked after 5 failed attempts. Please reset your password."

**Loading Behavior**
* Form inputs are disabled. Primary button shows a spinner. 

**Empty State UX**
* N/A.

**Edge Case Handling**
* **Token Expiry Mid-Session**: Set up an Axios/fetch interceptor. On a `401 Unauthorized`, silently attempt a token refresh. If the refresh fails, store the current URL, force logout, and redirect to login.

---

## React Component Architecture Outline

### Hooks

```typescript
// 1. Multi-Step Form
const { currentStep, formData, nextStep, prevStep, setFormData, isSubmitting } = useMultiStepForm(stepsConfig, initialData);

// 2. Pricing Calculator
const { basePrice, finalPrice, activePromos, isCalculating } = usePricingCalculator(product.basePrice, selectedOptions);

// 3. Faceted Search
const { data: products, filters, setFilter, sort, setSort, isLoading, isError } = useFacetedSearch(categorySlug);

// 4. Dashboard CRUD
const { data: prescriptions, addPrescription, deletePrescription } = usePrescriptions(); // Wraps React Query useMutation

// 5. Auth
const { user, login, logout, isLoading: isAuthLoading } = useAuth();
```

### Component Structural Logic (Example: Faceted Search)

```jsx
<SearchLayout>
  <Sidebar>
    {/* Filter Accordion reads from URL params */}
    <FilterGroup 
      title="Frame Shape" 
      options={availableFacets.shapes} 
      activeValues={filters.shapes} 
      onChange={(val) => setFilter('shape', val)} 
    />
  </Sidebar>
  
  <MainContent>
    <SearchHeader>
      <ResultCount count={products?.total} />
      <SortDropdown value={sort} onChange={setSort} />
    </SearchHeader>
    
    {isLoading ? (
      <ProductGridSkeleton count={12} />
    ) : products?.items.length === 0 ? (
      <EmptyStateSearch onClearFilters={() => setFilter('all', null)} />
    ) : (
      <ProductGrid>
        {products.items.map(product => (
          <ProductCard 
            key={product.id} 
            data={product} 
            // pricing hook is used inside ProductCard for real-time updates
          />
        ))}
      </ProductGrid>
    )}
    
    <Pagination 
      currentPage={filters.page} 
      totalPages={products?.totalPages} 
      onPageChange={(page) => setFilter('page', page)} 
    />
  </MainContent>
</SearchLayout>
```

### Handlers Outline

* `handleStepTransition(direction)`: Validates current step data schema before allowing `useMultiStepForm` to progress.
* `handleFilterToggle(facet, value)`: Updates the URL search parameters, which acts as the single source of truth, triggering a re-fetch in the `useFacetedSearch` hook.
* `handleOptimisticDelete(id)`: Invokes the `deletePrescription` mutation, instantly filtering the item out of the local React Query cache, and reverting on `onError`.
* `handleAuthSubmit(credentials)`: Calls the `login` function, awaits the secure cookie, and triggers a hard redirect to the dashboard or the previously stored `redirectUrl`.
