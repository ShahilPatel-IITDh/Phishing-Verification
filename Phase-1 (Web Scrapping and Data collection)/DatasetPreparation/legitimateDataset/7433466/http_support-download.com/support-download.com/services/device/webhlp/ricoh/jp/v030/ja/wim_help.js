//
// $Id: wim_help.js,v 1.1 2005/03/21 08:50:48 look Exp $
//
// wim_help.js
//
// 2005/03/21 OKAZAKI Hiroki (okaz@teshigoto.net, http://www.teshigoto.net)
//
// This file includes Japanese character set which coded in Shift JIS.
//
//

function writeMenu(sel_item) {
  var clv = new Array;  // css class values

  clv[0] = (sel_item == 0) ? 'm_item_a_sel' : 'm_item_a'; // �w���v�̎g����
  clv[1] = (sel_item == 1) ? 'm_item_a_sel' : 'm_item_a'; // WIM �ɂ���
  clv[20]= (sel_item == 20) ? 'm_item_a_sel' : 'm_item_a'; // �A�N�Z�X���ɂ���

  // �e��ʂ̐���
  clv[2] = (sel_item == 2) ? 'm_item_sel' : 'm_item'; // �z�[��
  clv[3] = (sel_item == 3) ? 'm_item_sel' : 'm_item'; // �h�L�������g�{�b�N�X
  clv[4] = (sel_item == 4) ? 'm_item_sel' : 'm_item'; // �t�@�N�X�~�ώ�M����
  clv[5] = (sel_item == 5) ? 'm_item_sel' : 'm_item'; // �v�����^�[�������
  clv[6] = (sel_item == 6) ? 'm_item_sel' : 'm_item'; // �t�H�[���ꗗ
  clv[7] = (sel_item == 7) ? 'm_item_sel' : 'm_item'; // �W���u
  clv[8] = (sel_item == 8) ? 'm_item_sel' : 'm_item'; // �A�h���X��
  clv[9] = (sel_item == 9) ? 'm_item_sel' : 'm_item'; // �ݒ�

  // �������
  clv[10] = (sel_item == 10) ? 'm_item_sel' : 'm_item'; // �h�L�������g�{�b�N�X
  clv[11] = (sel_item == 11) ? 'm_item_sel' : 'm_item'; // �t�@�N�X�~�ώ�M����
  clv[12] = (sel_item == 12) ? 'm_item_sel' : 'm_item'; // �v�����^�[�������
  clv[13] = (sel_item == 13) ? 'm_item_sel' : 'm_item'; // �t�H�[���ꗗ
  clv[14] = (sel_item == 14) ? 'm_item_sel' : 'm_item'; // �W���u
  clv[15] = (sel_item == 15) ? 'm_item_sel' : 'm_item'; // �A�h���X��
  clv[16] = (sel_item == 16) ? 'm_item_sel' : 'm_item'; // �ݒ�

  clv[17] = (sel_item == 17) ? 'm_item_a_sel' : 'm_item_a'; // �g�p��̒���
  clv[18] = (sel_item == 18) ? 'm_item_a_sel' : 'm_item_a'; // �p��
  clv[19] = (sel_item == 19) ? 'm_item_a_sel' : 'm_item_a'; // ���W


  document.write(
    '<a class="'+clv[0]+'" href="p_help.html">�w���v�̎g����</a>' +
    '<a class="'+clv[1]+'" href="p_top010.html">Web Image Monitor �ɂ���</a>' +
    '<a class="'+clv[20]+'" href="access_right.html">�A�N�Z�X���ɂ���</a>' +

    '<p class="m_title">�e��ʂ̐���</p>' +
    '<a class="'+clv[2]+'" href="index.html">�z�[��</a>' +
    '<a class="'+clv[3]+'" href="box0000.html">�h�L�������g�{�b�N�X</a>' +
    '<a class="'+clv[4]+'" href="lsb0000.html">�t�@�N�X�~�ώ�M����</a>' +
    '<a class="'+clv[5]+'" href="pri0000.html">�v�����^�[�������</a>' +
    '<a class="'+clv[6]+'" href="iol2910.html">�v�����^�[�t�H�[���ꗗ</a>' +
    '<a class="'+clv[7]+'" href="job2600.html">�W���u</a>' +
    '<a class="'+clv[8]+'" href="adr0000.html">�A�h���X��</a>' +
    '<a class="'+clv[9]+'" href="set4000.html">�ݒ�</a>' +

    '<p class="m_title">�������</p>' +
    '<a class="'+clv[10]+'" href="p_box000.html">�h�L�������g�{�b�N�X</a>' +
    '<a class="'+clv[11]+'" href="p_fax000.html">�t�@�N�X�~�ώ�M����</a>' +
    '<a class="'+clv[12]+'" href="p_pri000.html">�v�����^�[�������</a>' +
    '<a class="'+clv[13]+'" href="p_iol010.html">�v�����^�[�t�H�[���ꗗ</a>' +
    '<a class="'+clv[14]+'" href="p_job000.html">�W���u</a>' +
    '<a class="'+clv[15]+'" href="p_adr000.html">�A�h���X��</a>' +


    '<a class="'+clv[17]+'" href="note.html">�g�p��̒���</a>' +
    '<a class="'+clv[18]+'" href="yougo.html">�p��</a>' +
    '<a class="'+clv[19]+'" href="copyright.html">���W</a>'
  );
}
