/* Copyright 2021 Google LLC.
SPDX-License-Identifier: Apache-2.0 */

import { getTreeNodeWithParents } from '../tree-util';
import { hasValidInputType, inputHasAriaLabel, inputHasLabel } from './inputs';

describe('inputs', function () {
  describe('hasValidInputType', function () {
    it('should not return audit error when input contains valid type', function () {
      const tree = getTreeNodeWithParents({ children: [{ name: 'input', attributes: { type: 'text' } }] });
      const result = hasValidInputType(tree);
      expect(result).toEqual([]);
    });

    it('should return audit error when input contains invalid type', function () {
      const tree = getTreeNodeWithParents({ children: [{ name: 'input', attributes: { type: 'check' } }] });
      const result = hasValidInputType(tree);
      expect(result.length).toEqual(1);
      expect(result[0].items[0].name).toEqual('input');
      expect(result[0].items[0].context.suggestion).toEqual('checkbox');
      expect(result[0].type).toEqual('error');
    });

    it('should return audit error when input contains invalid type without suggestion', function () {
      const tree = getTreeNodeWithParents({ children: [{ name: 'input', attributes: { type: 'radiobutton' } }] });
      const result = hasValidInputType(tree);
      expect(result.length).toEqual(1);
      expect(result[0].items[0].name).toEqual('input');
      expect(result[0].items[0].context.suggestion).toBeNull();
      expect(result[0].type).toEqual('error');
    });
  });

  describe('inputHasLabel', function () {
    it('should not return audit error when input has a parent label', function () {
      const tree = getTreeNodeWithParents({
        children: [{ name: 'label', children: [{ text: 'text' }, { name: 'input', attributes: { type: 'text' } }] }],
      });
      const result = inputHasLabel(tree);
      expect(result).toEqual([]);
    });

    it('should not return audit error when input label identified by for', function () {
      const tree = getTreeNodeWithParents({
        children: [
          { name: 'label', attributes: { for: 'input' }, children: [{ text: 'text' }] },
          { name: 'input', attributes: { type: 'text', id: 'input' } },
        ],
      });
      const result = inputHasLabel(tree);
      expect(result).toEqual([]);
    });

    it('should return audit error when input contains invalid type without suggestion', function () {
      const tree = getTreeNodeWithParents({
        children: [
          { name: 'label', children: [{ text: 'text' }] },
          { name: 'input', attributes: { id: 'input', type: 'text' } },
        ],
      });
      const result = inputHasLabel(tree);
      expect(result.length).toEqual(1);
      expect(result[0].items[0].name).toEqual('input');
      expect(result[0].items[0].context).toBeFalsy();
      expect(result[0].type).toEqual('error');
    });

    it('should return audit error when select contains invalid type without suggestion', function () {
      const tree = getTreeNodeWithParents({
        children: [
          { name: 'label', children: [{ text: 'text' }] },
          { name: 'select', attributes: { id: 'select' } },
        ],
      });
      const result = inputHasLabel(tree);
      expect(result.length).toEqual(1);
      expect(result[0].items[0].name).toEqual('select');
      expect(result[0].type).toEqual('error');
    });

    it('should return audit error when textarea contains invalid type without suggestion', function () {
      const tree = getTreeNodeWithParents({
        children: [
          { name: 'label', children: [{ text: 'text' }] },
          { name: 'textarea', attributes: { id: 'textarea' } },
        ],
      });
      const result = inputHasLabel(tree);
      expect(result.length).toEqual(1);
      expect(result[0].items[0].name).toEqual('textarea');
      expect(result[0].items[0].context).toBeFalsy();
      expect(result[0].type).toEqual('error');
    });

    it('should not return audit error when input has uses aria-labelledby', function () {
      const tree = getTreeNodeWithParents({
        children: [
          { name: 'label', attributes: { id: 'label' }, children: [{ text: 'text' }] },
          { name: 'input', attributes: { 'type': 'text', 'aria-labelledby': 'label' } },
        ],
      });
      const result = inputHasLabel(tree);
      expect(result).toEqual([]);
    });
  });

  describe('inputHasAriaLabel', function () {
    it('should not return audit error when input does not uses aria-labelledby', function () {
      const tree = getTreeNodeWithParents({
        children: [
          { name: 'label', attributes: { id: 'label' }, children: [{ text: 'text' }] },
          { name: 'input', attributes: { type: 'text' } },
        ],
      });
      const result = inputHasAriaLabel(tree);
      expect(result).toEqual([]);
    });

    it('should not return audit error when input has uses aria-labelledby', function () {
      const tree = getTreeNodeWithParents({
        children: [
          { name: 'label', attributes: { id: 'label' }, children: [{ text: 'text' }] },
          { name: 'input', attributes: { 'type': 'text', 'aria-labelledby': 'label' } },
        ],
      });
      const result = inputHasAriaLabel(tree);
      expect(result).toEqual([]);
    });

    it('should return audit error when input has aria-labelledby but does not match label', function () {
      const tree = getTreeNodeWithParents({
        children: [
          { name: 'label', attributes: { id: 'label1' }, children: [{ text: 'text' }] },
          { name: 'input', attributes: { 'type': 'text', 'aria-labelledby': 'label2' } },
        ],
      });
      const result = inputHasAriaLabel(tree);
      expect(result.length).toEqual(1);
      expect(result[0].items[0].name).toEqual('input');
      expect(result[0].type).toEqual('error');
    });
  });
});
