# Performance Optimization Checklist

## Issues to Find and Fix:

### Rendering Issues
- [ ] Fix HeavyComponent to use React.memo
- [ ] Memoize the renderItem function with useCallback
- [ ] Fix inline styles in HeavyComponent
- [ ] Optimize StatDisplay to prevent unnecessary renders
- [ ] Fix inline object creation for stats prop

### List Optimization
- [ ] Fix listData reference issue (remove spread or use useMemo)
- [ ] Memoize filteredItems computation
- [ ] Add FlatList optimization props
- [ ] Implement getItemLayout for better scrolling
- [ ] Add initialNumToRender prop

### Function/Callback Issues
- [ ] Memoize all event handlers with useCallback
- [ ] Fix anonymous functions in props

### Image Optimization
- [ ] Add proper resizeMode to images
- [ ] Implement image caching strategy
- [ ] Use appropriate image dimensions

## Profiling Steps:
1. Open React DevTools Profiler
2. Click "Trigger Re-render" button 3 times
3. Analyze flame graph - what renders unnecessarily?
4. Fix one issue at a time
5. Re-profile to verify improvement
6. Measure FPS before and after

## Expected Improvements:
- Render time: from ~500ms → <50ms
- Components re-rendered: from 50+ → <5
- FPS: from 20-30 → 60