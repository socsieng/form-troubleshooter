/* Copyright 2021 Google LLC.
SPDX-License-Identifier: Apache-2.0 */

export const INPUT_SELECT_TEXT_FIELDS = ['input', 'select', 'textarea'];

// From https://html.spec.whatwg.org/multipage/form-control-infrastructure.html
export const AUTOCOMPLETE_TOKENS = [
  'additional-name',
  'address-level1',
  'address-level2',
  'address-level3',
  'address-level4',
  'address-line1',
  'address-line2',
  'address-line3',
  'bday',
  'bday-day',
  'bday-month',
  'bday-year',
  'billing',
  'cc-additional-name',
  'cc-csc',
  'cc-exp',
  'cc-exp-month',
  'cc-exp-year',
  'cc-family-name',
  'cc-given-name',
  'cc-name',
  'cc-number',
  'cc-type',
  'country',
  'country-name',
  'current-password',
  'email',
  'family-name',
  'fax',
  'given-name',
  'home',
  'honorific-prefix',
  // Allow 'on'.
  'honorific-suffix',
  'impp',
  'language',
  'mobile',
  'name',
  'new-password',
  'nickname',
  'on',
  'one-time-code',
  'organization',
  'organization-title',
  'pager',
  'photo',
  'postal-code',
  'sex',
  'shipping',
  'street-address',
  'tel',
  'tel-area-code',
  'tel-country-code',
  'tel-extension',
  'tel-local',
  'tel-national',
  'transaction-amount',
  'transaction-currency',
  'url',
  'username',
  'work',
];

// Keys are used to order sections displayed in popup.
export const ELEMENTS = {
  form: ['id', 'class', 'name', 'action', 'method'],
  input: ['id', 'class', 'name', 'autocomplete', 'placeholder', 'required', 'type'],
  select: ['id', 'class', 'name', 'autocomplete', 'required'],
  textarea: ['id', 'class', 'name', 'autocomplete', 'required'],
  button: ['id', 'class', 'name', 'textContent', 'type'],
  label: ['id', 'class', 'for', 'textContent'],
};

// From https://html.spec.whatwg.org/multipage/forms.html. Added 'role'.
// 'autofill-information' and 'autofill-prediction' are for use with chrome://flags/#show-autofill-type-predictions.
// aria-* and data-* are handled in getInvalidAttributes().
export const ATTRIBUTES = {
  global: [
    'accesskey',
    'autocapitalize',
    'autofocus',
    'autofill-information',
    'autofill-prediction',
    'class',
    'contenteditable',
    'dir',
    'draggable',
    'enterkeyhint',
    'hidden',
    'inputmode',
    'is',
    'id',
    'itemid',
    'itemprop',
    'itemref',
    'itemscope',
    'itemtype',
    'lang',
    'nonce',
    'role',
    'spellcheck',
    'style',
    'tabindex',
    'title',
    'translate',
  ],
  button: [
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'name',
    'type',
    'value',
  ],
  form: ['accept-charset', 'action', 'autocomplete', 'enctype', 'method', 'name', 'novalidate', 'target', 'rel'],
  // autocorrect for Safari
  input: [
    'accept',
    'alt',
    'autocomplete',
    'autocorrect',
    'checked',
    'dirname',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'height',
    'list',
    'max',
    'maxlength',
    'min',
    'minlength',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'readonly',
    'required',
    'size',
    'src',
    'step',
    'type',
    'value',
    'width',
    'title',
  ],
  label: ['for'],
  select: ['autocomplete', 'disabled', 'form', 'multiple', 'name', 'required', 'size'],
  textarea: [
    'autocomplete',
    'cols',
    'dirname',
    'disabled',
    'form',
    'maxlength',
    'minlength',
    'name',
    'placeholder',
    'readonly',
    'required',
    'rows',
    'wrap',
  ],
};

export const FORM_FIELDS = ['form', 'label', 'button', 'input', 'select', 'textarea'];
