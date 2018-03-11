import { Directive, ComponentFactory, ComponentRef, Input, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SpinnerDirective } from './spinner.directive';

describe('SpinnerDirective', () => {
  it('should create an instance', () => {
    const directive = new SpinnerDirective(null, null, null);
    expect(directive).toBeTruthy();
  });
});
