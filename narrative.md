Morrisons - Forecast comparison
--------------------------------

Narrative
================================

## Use case 1 : *X in v1, N/A in v2*


> **Expected and wished behavior**.

> The preps are not in the production plans anymore.

**Example**

| Store	| Date       | Schedu. | SKU       | PA  | v1 |	v2 |
|------ | ---------- | ------- | --------- | --- | -- | --- |
| 313	| 10/17/2021 | 10:00AM | 104305589 | 390 | 30 |	n/a |

**104305589 - M' STOUT CHICKEN THIGH is a prep item.**
- It has no PLU.
- It has a prep step (Cook 4 hours)

> *Test was made on 10 random use cases that has all verified the above assumption.*

&nbsp;
&nbsp; 

---

## Use case 2 : *X in v1, Y in v2*

On very rare occasions, we have a big delta :

| Store	| Date       | Schedu. | SKU       | PA  | v1 |	v2 |
|------ | ---------- | ------- | --------- | --- | -- | --- |
| 304	| 10/18/2021 | 10:00AM | 109821363 | 390 | 10 |	1 |
| 304	| 10/18/2021 | 10:00AM | 110488633 | 390 | 23 |	8 |
